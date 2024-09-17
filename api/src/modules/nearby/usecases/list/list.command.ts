import { AuthenticatedCommand } from '@shared/command';
import { IsBoolean, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class ListCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  mine: boolean;
}
