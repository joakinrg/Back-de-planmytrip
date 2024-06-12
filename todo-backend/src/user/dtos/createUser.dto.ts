import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  @IsEmail()
  email: string;

  @MinLength(8)
  @Transform(({ value }) => value.trim())
  @Matches(
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&#"'-_()/])[A-Za-z\d@$!%?&#"'-_()/]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos una minuscula, una mayuscula, un numero y un caracter especial',
    },
  )
  @IsString()
  password: string;
}
