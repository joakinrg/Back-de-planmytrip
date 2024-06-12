import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

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
}
