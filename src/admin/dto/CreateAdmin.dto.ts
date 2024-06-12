import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Matches(
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#"'-_()/])[A-Za-z\d@$!%?&#"'-_()/]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un caracter especial',
    },
  )
  contraseña: string;
}
