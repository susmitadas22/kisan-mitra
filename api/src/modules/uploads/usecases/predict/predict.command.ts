import { AuthenticatedCommand } from '@shared/command';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class PredictCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  size: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  type: string;
}
