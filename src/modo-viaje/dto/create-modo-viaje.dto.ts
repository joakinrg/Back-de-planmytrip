import { IsString } from 'class-validator';

export class CreateModoViajeDto {
  @IsString()
  readonly tipoModo: string;
}
