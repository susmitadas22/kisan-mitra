import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { USE_CASES } from './usecases';
import { PrismaService } from '@shared/database';

@Module({
  controllers: [UserController],
  providers: [...USE_CASES, PrismaService],
  exports: [...USE_CASES],
})
export class UserModule {}
