import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PREDICT_URL } from '@shared/constants';
import { PrismaService } from '@shared/database';
import { generateText } from 'ai';
import axios from 'axios';
import { PredictCommand } from './predict.command';
import { Expo } from 'expo-server-sdk';

type Prediction = {
  label: string;
  score: number;
};
@Injectable()
export class Predict {
  private S3Client: S3Client;
  private logger = new Logger(Predict.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.S3Client = new S3Client({
      region: this.configService.get<string>('auto'),
      endpoint: this.configService.get<string>('s3.endpoint'),
      credentials: {
        accessKeyId: this.configService.get<string>(
          's3.credentials.accessKeyId',
        ),
        secretAccessKey: this.configService.get<string>(
          's3.credentials.secretAccessKey',
        ),
      },
    });
  }
  async execute(command: PredictCommand) {
    const { sub, image, type, lat, lng } = command;
    const { id } = await this.prismaService.image.create({
      data: {
        mimeType: type,
        sub,
        lat,
        lng,
      },
    });
    const base64Data = Buffer.from(image, 'base64');
    await this.S3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('s3.bucket'),
        Key: `${id}.${type.split('/')[1]}`,
        Body: base64Data,
        ContentType: type,
      }),
    );
    const url = `https://kisan.jabed.dev/${id}.${type.split('/')[1]}`;
    try {
      const { data } = await axios.post<Prediction[]>(PREDICT_URL, {
        sub,
        image: `https://kisan.jabed.dev/${id}.${type.split('/')[1]}`,
      });
      const google = createGoogleGenerativeAI({
        apiKey: this.configService.get<string>('app.ai'),
      });
      console.log(`${data[0].label}`);
      const cause = await generateText({
        model: google('gemini-pro'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `state causes for this plant disease ${data[0].label} in 20 words in a single paragraph`,
              },
            ],
          },
        ],
      });
      const cure = await generateText({
        model: google('gemini-pro'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `state cure for this plant disease ${data[0].label} in 20 words in a single paragraph`,
              },
            ],
          },
        ],
      });
      const symptoms = await generateText({
        model: google('gemini-pro'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `state symptoms for this plant disease ${data[0].label} in 20 words in a single paragraph`,
              },
            ],
          },
        ],
      });
      const preventions = await generateText({
        model: google('gemini-pro'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `state preventions for this plant disease ${data[0].label} in 20 words in a single paragraph. also give the name of the medicines u say`,
              },
            ],
          },
        ],
      });
      console.log({
        cause: cause.text,
        cure: cure.text,
        symptoms: symptoms.text,
        preventions: preventions.text,
      });
      await this.prismaService.image.update({
        where: {
          id,
        },
        data: {
          disease: data[0].label,
          cause: cause.text,
          cure: cure.text,
          symptoms: symptoms.text,
          preventions: preventions.text,
        },
      });
      const nearby = await this.prismaService.user.findMany({
        where: {
          lat: {
            gte: lat - 0.1,
            lte: lat + 0.1,
          },
          lng: {
            gte: lng - 0.1,
            lte: lng + 0.1,
          },
        },
      });
      const tokens = nearby.map((user) => user.device_token);
      const expo = new Expo({
        useFcmV1: true,
      });
      const messages = [];
      for (const pushToken of tokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`,
          );
          continue;
        }
        messages.push({
          to: pushToken,
          sound: 'default',
          body: 'This is a test notification',
          data: { withSome: 'data' },
        });
      }
      try {
        const data = await expo.sendPushNotificationsAsync(messages);
        console.log(data);
      } catch (error: any) {
        console.error(error);
      }
      return {
        id,
        url,
        disease: data[0].label,
        cause: cause.text,
        cure: cure.text,
        symptoms: symptoms.text,
        preventions: preventions.text,
      };
    } catch (error: any) {
      this.logger.error(error);
      throw new HttpException(
        'Error while trying to predict image',
        error.response.status,
      );
    }
  }
}
