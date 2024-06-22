import { Expose } from 'class-transformer';

export class PersonaDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  apellidoM: string;

  @Expose()
  apellidoP: string;
}
