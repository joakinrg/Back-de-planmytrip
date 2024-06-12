import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tareastodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column()
  fechaVencimiento: Date;

  @Column()
  prioridad: string;
}
