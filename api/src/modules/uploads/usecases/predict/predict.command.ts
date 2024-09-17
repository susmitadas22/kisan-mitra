import { AuthenticatedCommand } from '@shared/command';
import { IsDefined, IsNotEmpty } from 'class-validator';

export class PredictCommand extends AuthenticatedCommand {
  @IsDefined()
  @IsNotEmpty()
  image: Express.Multer.File;
}
