import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateViajeDto {
  @IsString()
  titulo: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsDate()
  fechaInicio: Date;

  @IsDate()
  fechaRegreso: Date;

  @IsString()
  destino: string;

  @IsNumber()
  presupuestoViaje: number;

  @IsNumber()
  presupuetoTransporte: number;

  @IsNumber()
  presupuestoActividades: number;

  @IsNumber()
  acompanantes: number;

  @IsString()
  tipoModo: string;

  @IsString()
  tipoTransporte: string;

  @IsString()
  correo: string;
}
