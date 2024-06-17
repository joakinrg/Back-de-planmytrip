import { Modo } from 'src/modo-viaje/entities/modo-viaje.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transporte } from '../../transporte/entities/transporte.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaRegreso: Date;

  @Column()
  destino: string;

  @Column()
  presupuestoViaje: number;

  @Column()
  presupuetoTransporte: number;

  @Column()
  presupuestoActividades: number;

  @Column()
  acompanantes: number;

  @ManyToOne(() => Modo, (modo) => modo.id, { eager: true, cascade: true })
  modo: Modo;

  @ManyToOne(() => Transporte, (transporte) => transporte.id, {
    eager: true,
    cascade: true,
  })
  transporte: Transporte;

  @ManyToOne(() => User, (usuario) => usuario.viajes)
  usuario: User;

  constructor(item: Partial<Viaje>) {
    Object.assign(this, item);
  }
}
