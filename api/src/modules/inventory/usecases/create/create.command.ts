import { AuthenticatedCommand } from '@shared/command';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;


}
