import { registerAs } from '@nestjs/config';

type DocConfig = {
  name: string;
  description: string;
  version: string;
  prefix: string;
};

export default registerAs(
  'doc',
  (): Required<DocConfig> => ({
    name:
      `${process.env.APP_NAME && process.env.APP_NAME} API` ??
      '@dipeat/admin-api API',
    description: `${(process.env.APP_NAME && process.env.APP_NAME) ?? '@dipeat/admin-api'} API Documentation`,
    version: '1.0',
    prefix: '/docs',
  }),
);
