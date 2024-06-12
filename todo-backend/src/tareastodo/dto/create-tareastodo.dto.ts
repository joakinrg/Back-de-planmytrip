import { IsDate, IsString } from 'class-validator';

export class CreateTareastodoDto {
  @IsString()
  titulo: string;

  @IsString()
  description: string;

  @IsDate()
  fechaVencimiento: Date;

  @IsString()
  prioridad: string;
}
