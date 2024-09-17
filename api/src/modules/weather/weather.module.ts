import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { USE_CASES } from './usecases';
import { PrismaService } from '@shared/database';

@Module({
  controllers: [WeatherController],
  providers: [...USE_CASES, PrismaService],
  exports: [...USE_CASES],
})
export class WeatherModule {}
