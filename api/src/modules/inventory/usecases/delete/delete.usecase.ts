import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { DeleteCommand } from './delete.command';

@Injectable()
export class Delete {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteCommand) {
    const { id, sub } = command;
    try {
      return this.prismaService.inventory.delete({
        where: {
          id,
          sub,
        },
      });
    } catch (error) {
      throw new ForbiddenException('You are not allowed to delete this item');
    }
  }
}
