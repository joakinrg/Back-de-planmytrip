import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateTareastodoDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  fechaVencimiento: Date;

  @IsString()
  @IsOptional()
  prioridad: string;
}
