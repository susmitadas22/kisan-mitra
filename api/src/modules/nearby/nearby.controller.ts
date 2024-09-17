import { Body, Controller, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { List, ListCommand } from './usecases/list';

@ApiTags('Nearby')
@Controller({
  path: '/nearby',
  version: '1',
})
export class NearbyController {
  constructor(private readonly listUseCase: List) {}

  @Cron('*/10 * * * * *')
  warn() {
    console.log('Called when the cron job is triggered');
  }

  @Post('/')
  @ApiOperation({ summary: 'Get nearby user' })
  list(@Body() payload: any) {
    return this.listUseCase.execute(
      ListCommand.create({
        lat: payload.lat,
        lng: payload.lng,
        sub: payload.sub,
      }),
    );
  }
}
