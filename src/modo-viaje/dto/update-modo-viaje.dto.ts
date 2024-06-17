import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateModoViajeDto } from './create-modo-viaje.dto';

export class UpdateModoViajeDto extends PartialType(CreateModoViajeDto) {
  @IsOptional()
  @IsString()
  readonly tipoModo: string;
}
