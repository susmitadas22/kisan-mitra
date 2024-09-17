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
import { AuthUser } from '@shared/decorators';
import { IAuthPayload } from '@shared/types';
// import { Create, CreateCommand } from './usecases/create';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor() {}

  @Put('/')
  @ApiOperation({ summary: 'Upload an item' })
  @UseInterceptors(FileInterceptor('image'))
  create(
    @AuthUser() user: IAuthPayload,
    @Body() payload: any,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    // return this.createUseCase.execute(
    //   CreateCommand.create({
    //     ...payload,
    //     shop_Id: user.shop,
    //     user_Id: user.sub,
    //     image: file,
    //   }),
    // );
    console.log({ user, payload, file });
    return {
      message: 'success',
    };
  }
}
