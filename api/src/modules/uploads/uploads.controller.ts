import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Predict, PredictCommand } from './usecases/predict';

@ApiTags('Uploads')
@Controller({
  path: '/uploads',
  version: '1',
})
export class UploadsController {
  constructor(private readonly predictUseCase: Predict) {}

  @Post('/')
  @ApiOperation({ summary: 'Upload an item' })
  @UseInterceptors(FileInterceptor('buffer'))
  predict(@Body() payload: any) {
    return this.predictUseCase.execute(
      PredictCommand.create({
        image: payload.image,
        sub: payload.sub,
        size: payload.size,
        lat: payload.coords.latitude,
        lng: payload.coords.longitude,
        type: payload.type,
      }),
    );
  }
}
