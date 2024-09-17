import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { MineCommand } from './mine.command';

@Injectable()
export class Mine {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(command: MineCommand) {
    const { sub } = command;
    return this.prismaService.inventory.findMany({
      where: {
        sub,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
