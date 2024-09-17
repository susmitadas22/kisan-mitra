import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { PredictCommand } from './predict.command';

@Injectable()
export class Predict {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: PredictCommand) {
    const { sub} = command;
  }
}
