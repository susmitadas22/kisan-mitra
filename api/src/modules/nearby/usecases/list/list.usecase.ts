import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/database';
import { ListCommand } from './list.command';

@Injectable()
export class List {
  private logger = new Logger(List.name);
  constructor(private readonly prismaService: PrismaService) {}
  async execute(command: ListCommand) {
    const { lat, lng } = command;
    this.logger.log(`Listing nearby users at ${lat}, ${lng}`);
    /**
     * all entries within 10km of the given lat/lng
     */
    const nearby = await this.prismaService.image.findMany({
      where: {
        lat: {
          gte: lat - 0.1, // 0.1 is 10km
          lte: lat + 0.1, // 0.1 is 10km
        },
        lng: {
          gte: lng - 0.1, // 0.1 is 10km
          lte: lng + 0.1, // 0.1 is 10km
        },
      },
    });
    return nearby;
  }
}
