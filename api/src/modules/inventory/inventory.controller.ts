import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Create, CreateCommand } from './usecases/create';
import { Delete as DeleteItem } from './usecases/delete';
import { List, ListCommand } from './usecases/list';

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
  ) {}

  @ApiOperation({ summary: 'List inventory items' })
  @Post('/')
  list(@Body('sub') sub: string) {
    return this.listUseCase.execute(
      ListCommand.create({
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
}
