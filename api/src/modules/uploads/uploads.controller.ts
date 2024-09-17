import {
  Body,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Predict, PredictCommand } from './usecases/predict';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly predictUseCase: Predict) {}

  @Post('/')
  @ApiOperation({ summary: 'Upload an item' })
  @UseInterceptors(FileInterceptor('buffer'))
  predict(
    @Body() payload: any,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log({
      payload,
      file,
    });
    return this.predictUseCase.execute(
      PredictCommand.create({
        image: payload.image,
        sub: payload.sub,
        size: payload.size,
        type: payload.type,
      }),
    );
  }
}
