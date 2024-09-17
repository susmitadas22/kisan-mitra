import { IsNotEmpty } from 'class-validator';
import { BaseCommand } from './base.command';

export abstract class AuthenticatedCommand extends BaseCommand {
  @IsNotEmpty()
  public readonly user_Id: string;
}
