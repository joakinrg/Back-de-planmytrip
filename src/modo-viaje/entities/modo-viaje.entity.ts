import { Viaje } from 'src/viajes/entity/Viaje.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoModo: string;

  @OneToMany(() => Viaje, (viaje) => viaje.modo)
  viaje: Viaje[];

  constructor(item: Partial<Modo>) {
    Object.assign(this, item);
  }
}
