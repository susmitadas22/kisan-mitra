import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { UploadsController } from './uploads.controller';
// import { USE_CASES } from './usecases';

@Module({
  providers: [PrismaService],
  controllers: [UploadsController],
  exports: [],
})
export class UploadsModule {}
