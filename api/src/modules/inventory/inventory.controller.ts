import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@shared/database';
import { Create, CreateCommand } from './usecases/create';
import { Delete as DeleteItem } from './usecases/delete';
import { List, ListCommand } from './usecases/list';
import { Mine, MineCommand } from './usecases/mine';

@ApiTags('Inventory')
@Controller({
  path: '/inventory',
  version: '1',
})
export class InventoryController {
  constructor(
    private readonly listUseCase: List,
    private readonly deleteUseCase: DeleteItem,
    private readonly createUseCase: Create,
    private readonly mineUseCase: Mine,
    private readonly prismaService: PrismaService,
  ) {}

  @ApiOperation({ summary: 'List inventory items' })
  @Get('/explore')
  list(@Query('sub') sub: string) {
    return this.listUseCase.execute(
      ListCommand.create({
        sub,
      }),
    );
  }

  @ApiOperation({ summary: 'List shared inventory items' })
  @Get('/')
  my(@Query('sub') sub: string) {
    return this.mineUseCase.execute(
      MineCommand.create({
        sub,
      }),
    );
  }

  @ApiOperation({ summary: 'Create an inventory item' })
  @Post('/')
  create(
    @Body()
    payload: {
      name: string;
      price?: number;
      quantity?: number;
      sub: string;
    },
  ) {
    return this.createUseCase.execute(
      CreateCommand.create({
        name: payload.name,
        price: payload.price,
        quantity: payload.quantity,
        sub: payload.sub,
      }),
    );
  }

  @ApiOperation({ summary: 'Delete an inventory item' })
  @Delete('/')
  delete(@Body('id') id: string, @Body('sub') sub: string) {
    return this.deleteUseCase.execute({
      id,
      sub,
    });
  }

  @ApiOperation({ summary: 'Make an inventory item shared/unshared' })
  @Patch('/shared')
  async shared(@Body('id') id: string) {
    const item = await this.prismaService.inventory.findUnique({
      where: {
        id,
      },
    });
    return this.prismaService.inventory.update({
      where: {
        id,
      },
      data: {
        shared: !item.shared,
      },
    });
  }
}
