import { Exclude, Expose, Type } from 'class-transformer';
import { PersonaDto } from './Persona.dto';

export class UserDtoInterceptor {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Type(() => PersonaDto)
  persona: PersonaDto;

  @Exclude()
  password: string;
}
