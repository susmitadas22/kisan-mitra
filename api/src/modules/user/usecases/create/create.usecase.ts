import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { CreateCommand } from './create.command';

@Injectable()
export class Create {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(command: CreateCommand) {
    const { lat, lng, sub, token } = command;
    console.log({ lat, lng, sub, token });
    const user = await this.prismaService.user.findFirst({
      where: {
        sub,
      },
    });
    if (!user) {
      await this.prismaService.user
        .create({
          data: {
            lat,
            lng,
            sub,
            device_token: token,
          },
        })
        .then((user) => {
          `User created with id: ${user.id}`;
        });
    } else {
      await this.prismaService.user
        .update({
          where: {
            id: user.id,
          },
          data: {
            lat,
            lng,
            device_token: token,
          },
        })
        .then((user) => {
          `User updated with id: ${user.id}`;
        });
    }
  }
}
