import configs from '@/config';
import { MODULES } from '@/modules';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@shared/database';
import {
  GlobalExceptionFilter,
  ResponseInterceptor,
} from '@shared/interceptors';
import { LoggingMiddleware } from '@shared/middlewares';
import { AppController } from './app.controller';

@Module({
  imports: [
    ...MODULES,
    DatabaseModule,
    TerminusModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.local'],
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
