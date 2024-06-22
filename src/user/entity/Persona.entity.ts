import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Persona {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidoP: string;

  @Column()
  apellidoM: string;

  @OneToOne(() => User, (user) => user.persona, {
    onDelete: 'CASCADE',
  })
  user: User;
}
