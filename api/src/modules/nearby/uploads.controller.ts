import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { List, ListCommand } from './usecases/list';

@Controller('nearby')
export class NearbyController {
  constructor(private readonly listUseCase: List) {}

  @Post('/')
  @ApiOperation({ summary: 'Get nearby user' })
  list(@Body() payload: any) {
    return this.listUseCase.execute(
      ListCommand.create({
        lat: payload.lat,
        lng: payload.lng,
      }),
    );
  }
}
