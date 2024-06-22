import { Viaje } from 'src/viajes/entity/Viaje.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from './Persona.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Persona, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  persona: Persona;

  @OneToMany(() => Viaje, (viaje) => viaje.usuario)
  viajes: Viaje[];
}
