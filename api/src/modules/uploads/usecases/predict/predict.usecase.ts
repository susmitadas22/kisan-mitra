import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PREDICT_URL } from '@shared/constants';
import { PrismaService } from '@shared/database';
import axios from 'axios';
import ollama from 'ollama';
import { PredictCommand } from './predict.command';

type Prediction = {
  label: string;
  score: number;
};
@Injectable()
export class Predict {
  private S3Client: S3Client;
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
    const { sub, image, type } = command;
    const { id } = await this.prismaService.image.create({
      data: {
        mimeType: type,
        sub,
      },
    });
    console.log({
      Bucket: this.configService.get<string>('s3.bucket'),
      Key: `${id}.${type.split('/')[1]}`,
      Body: Buffer.from(image, 'base64'),
      ContentType: type,
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
    console.log(`https://kisan.jabed.dev/${id}.${type.split('/')[1]}`);
    try {
      const { data } = await axios.post<Prediction[]>(PREDICT_URL, {
        sub,
        image: `https://kisan.jabed.dev/${id}.${type.split('/')[1]}`,
      });
      const response = await ollama.chat({
        model: 'llama3',
        messages: [
          {
            role: 'user',
            content: `Cause for the disease is ${data[0].label}, also give the cure to it. Answer in a single paragragh and 50 words maximum.`,
          },
        ],
      });
      const { data: translated } = await axios.post<{
        translatedText: string;
      }>('https://libretranslate.com/translate', {
        q: response.message.content,
        source: 'auto',
        target: 'hi',
        format: 'text',
        alternatives: 3,
        api_key: '',
      });

      return {
        name: data[0].label,
        text: translated.translatedText,
      };
    } catch (error) {
      throw new HttpException(
        'Error while trying to predict image',
        error.response.status,
      );
    }
  }
}
