import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Info, InfoCommand } from './usecases/info';

@ApiTags('Weather')
@Controller({
  path: '/weather',
  version: '1',
})
export class WeatherController {
  constructor(private readonly infoUseCase: Info) {}

  @Get('/')
  info(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.infoUseCase.execute(
      InfoCommand.create({
        lat,
        lng,
      }),
    );
  }
}
