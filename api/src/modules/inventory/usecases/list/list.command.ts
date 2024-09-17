import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { ListCommand } from './list.usecase';

@Injectable()
export class List {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: ListCommand) {
    const { sub } = command;
    return this.prismaService.inventory.findMany({
      where: {
        sub: {
          not: sub,
        },
        shared: false,
      },
    });
  }
}
