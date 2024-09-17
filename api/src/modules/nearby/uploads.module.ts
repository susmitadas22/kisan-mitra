import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { NearbyController } from './uploads.controller';
import { USE_CASES } from './usecases';

@Module({
  providers: [PrismaService, ...USE_CASES],
  controllers: [NearbyController],
  exports: [...USE_CASES],
})
export class NearbyModule {}
