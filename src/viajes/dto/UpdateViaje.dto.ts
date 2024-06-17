import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateViajeDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  descripcion: string;

  @IsDate()
  @IsOptional()
  fechaInicio: Date;

  @IsDate()
  @IsOptional()
  fechaRegreso: Date;

  @IsString()
  @IsOptional()
  destino: string;

  @IsNumber()
  @IsOptional()
  presupuestoViaje: number;

  @IsNumber()
  @IsOptional()
  presupuetoTransporte: number;

  @IsNumber()
  @IsOptional()
  presupuestoActividades: number;

  @IsNumber()
  @IsOptional()
  acompanantes: number;
}
