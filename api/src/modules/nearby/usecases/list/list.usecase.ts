import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { ListCommand } from './list.command';

@Injectable()
export class List {
  private logger = new Logger(List.name);
  constructor(private readonly prismaService: PrismaService) {}
  async execute(command: ListCommand) {
    const { lat, lng, sub } = command;
    this.logger.log(`Listing nearby users at ${lat}, ${lng}`);
    /**
     * all entries within 10km of the given lat/lng
     */
    const nearby = await this.prismaService.image.findMany({
      where: {
        cause: {
          not: null,
        },
        disease: {
          not: null,
        },
        preventions: {
          not: null,
        },
        sub: {
          not: sub,
        },
        cure: {
          not: null,
        },
        symptoms: {
          not: null,
        },
        lat: {
          gte: lat - 0.1, // 0.1 is 10km
          lte: lat + 0.1, // 0.1 is 10km
        },
        lng: {
          gte: lng - 0.1, // 0.1 is 10km
          lte: lng + 0.1, // 0.1 is 10km
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return nearby;
  }
}
