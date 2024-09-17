import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@shared/database';
import { PredictCommand } from './predict.command';

@Injectable()
export class Predict {
  private s3Client: S3Client;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: configService.getOrThrow('s3.endpoint'),
      credentials: {
        accessKeyId: configService.getOrThrow('s3.credentials.accessKeyId'),
        secretAccessKey: configService.getOrThrow(
          's3.credentials.secretAccessKey',
        ),
      },
    });
  }
  async execute(command: PredictCommand) {
    const { sub, image } = command;
    const { id, mimeType } = await this.prismaService.image.create({
      data: {
        sub,
        mimeType: image.originalname.split('.').pop(),
      },
    });
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('s3.bucket'),
        Key: id,
        Body: image.buffer,
        ContentType: image.mimetype,
      }),
    );
    console.log(`https://kisan.jabed.dev/${id}.${mimeType}`);
    // try {
    //   const { data } = await axios.post(PREDICT_URL, {
    //     sub,
    //     image_path: `https://kisan.jabed.dev/${id}.${mimeType}`,
    //   });
    //   console.log(data);
    //   return data;
    // } catch (error) {
    //   throw new HttpException(
    //     'Error while trying to predict image',
    //     error.response.status,
    //   );
    // }
  }
}
