import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Create, CreateCommand } from './usecases/create';

@ApiTags('User')
@Controller({
  path: '/user',
  version: '1',
})
export class UserController {
  constructor(private readonly createUseCase: Create) {}
  @Post('/')
  create(@Body() payload: any) {
    this.createUseCase.execute(
      CreateCommand.create({
        lat: payload.lat,
        lng: payload.lng,
        sub: payload.sub,
        token: payload.token,
      }),
    );
  }
}
