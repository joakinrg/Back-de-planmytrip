import { IsOptional, IsString } from 'class-validator';

export class UpdateTransporteDto {
  @IsOptional()
  @IsString()
  tipoTransporte: string;
}
