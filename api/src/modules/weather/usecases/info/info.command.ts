import { BaseCommand } from '@shared/command';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class InfoCommand extends BaseCommand {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  lng: number;
}
