import { Injectable } from '@nestjs/common';
import { CreateCommand } from './create.command';
import { PrismaService } from '@shared/database';

@Injectable()
export class Create {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateCommand) {
    const { name, sub, price, quantity } = command;
    return this.prismaService.inventory.create({
      data: {
        name,
        price,
        quantity,
        sub,
      },
    });
  }
}
