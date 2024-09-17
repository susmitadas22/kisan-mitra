import { setupSwagger } from '@/swagger';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('kisan mitra api');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('app.http.port');
  const host: string = configService.get<string>('app.http.host');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.versioning.prefix',
  );
  const version: string = configService.get<string>('app.versioning.version');
  const versionEnable: string = configService.get<string>(
    'app.versioning.enable',
  );
  app.use(helmet());
  app.getHttpAdapter().getInstance().set('json spaces', 4);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix(globalPrefix);
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  if (configService.get<string>('app.env') === 'development') {
    setupSwagger(app);
  }
  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health');
  });
  await app.listen(port, () => {
    logger.log(
      `🚀 ${configService.get<string>('app.name').toLocaleUpperCase()} is running on ${host}:${port}`,
    );
  });
}
bootstrap();
