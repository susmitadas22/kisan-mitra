import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { InventoryController } from './inventory.controller';
import { USE_CASES } from './usecases';

@Module({
  providers: [PrismaService, ...USE_CASES],
  controllers: [InventoryController],
  exports: [...USE_CASES],
})
export class InventoryModule {}
