import {
  Body,
  Controller,
  ParseFilePipe,
  Put,
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

  @Put('/')
  @ApiOperation({ summary: 'Upload an item' })
  @UseInterceptors(FileInterceptor('image'))
  predict(
    @Body() payload: { sub: string },
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log({
      file,
      payload,
    });
    return this.predictUseCase.execute(
      PredictCommand.create({
        image: file,
        sub: payload.sub,
      }),
    );
  }
}
