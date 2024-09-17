import { IsNotEmpty } from 'class-validator';
import { AuthenticatedCommand } from './authenticated.command';

export abstract class InventoryCommand extends AuthenticatedCommand {
  @IsNotEmpty()
  public readonly id: string;
}
