import { Viaje } from 'src/viajes/entity/Viaje.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transporte {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  tipoTransporte: string;

  @OneToMany(() => Viaje, (viaje) => viaje.transporte)
  viaje: Viaje[];

  constructor(item: Partial<Transporte>) {
    Object.assign(this, item);
  }
}
