import { registerAs } from '@nestjs/config';

type S3Config = {
  region: string;
  endpoint: string;
  bucket: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

export default registerAs(
  's3',
  (): Required<S3Config> => ({
    region: process.env.AWS_BUCKET ?? 'auto',
    endpoint: process.env.AWS_ENDPOINT ?? '',
    bucket: process.env.AWS_BUCKET ?? '',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  }),
);
