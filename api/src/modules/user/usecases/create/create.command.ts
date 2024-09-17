import { AuthenticatedCommand } from '@shared/command';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lng: number;
}
