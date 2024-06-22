import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @MinLength(5)
  @IsEmail()
  email: string;

  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Matches(
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#"'-_()/])[A-Za-z\d@$!%?&#"'-_()/]{8,}$/,
    {
      message:
        'la contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial',
    },
  )
  @IsString()
  password: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  nombre: string;

  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @Length(2, 50)
  @IsString()
  apellidoM: string;

  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  @Length(2, 50)
  @IsString()
  apellidoP: string;
}
