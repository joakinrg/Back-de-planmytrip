import { IsString } from 'class-validator';

export class CreateTransporteDto {
  @IsString()
  tipoTransporte: string;
}
