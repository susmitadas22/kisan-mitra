import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { UploadsController } from './uploads.controller';
import { USE_CASES } from './usecases';

@Module({
  providers: [PrismaService, ...USE_CASES],
  controllers: [UploadsController],
  exports: [...USE_CASES],
})
export class UploadsModule {}
