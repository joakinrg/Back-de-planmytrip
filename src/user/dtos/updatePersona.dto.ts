import { IsOptional, IsString, Length, Matches } from 'class-validator';

class UpdatePersonaDto {
  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @IsOptional()
  nombre: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @IsOptional()
  apellidoM: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @IsOptional()
  apellidoP: string;
}

export { UpdatePersonaDto };
