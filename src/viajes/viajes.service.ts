import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modo } from '../modo-viaje/entities/modo-viaje.entity';
import { Transporte } from '../transporte/entities/transporte.entity';
import { User } from '../user/entity/user.entity';
import { CreateViajeDto } from './dto/CreateViaje.dto';
import { UpdateViajeDto } from './dto/UpdateViaje.dto';
import { Viaje } from './entity/Viaje.entity';

@Injectable()
export class ViajesService {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
    @InjectRepository(Modo)
    private readonly modoRepository: Repository<Modo>,
    @InjectRepository(Transporte)
    private readonly transporteRepository: Repository<Transporte>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addViaje(createViaje: CreateViajeDto) {
    const modo = await this.modoRepository.findOneBy({
      tipoModo: createViaje.tipoModo,
    });

    if (!modo) {
      throw new NotFoundException('El modo de viaje no existe');
    }

    const transporte = await this.transporteRepository.findOneBy({
      tipoTransporte: createViaje.tipoTransporte,
    });

    if (!transporte) {
      throw new NotFoundException('El transporte no existe');
    }

    const user = await this.userRepository.findOneBy({
      email: createViaje.correo,
    });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const viaje = {
      ...createViaje,
      modo,
      transporte,
      usuario: user,
    };

    return await this.viajeRepository.save(viaje);
  }

  async getViajesAsociados(email: string) {
    const [viajes] = await this.viajeRepository.find({
      where: { usuario: { email: email } },
    });

    if (!viajes) {
      throw new NotFoundException('No se encontraron viajes asociados');
    }

    return viajes;
  }

  async getViajeById(id: string) {
    const viaje = await this.viajeRepository.findOneBy({ id });

    if (!viaje) {
      throw new NotFoundException('No se encontró el viaje');
    }

    return viaje;
  }

  async updateViaje(id: string, updateViaje: UpdateViajeDto) {
    const viaje = await this.viajeRepository.findOneBy({ id });

    if (!viaje) {
      throw new NotFoundException('No se encontró el viaje');
    }

    Object.assign(viaje, updateViaje);

    return await this.viajeRepository.save(viaje);
  }

  async updateViajeTransporte(id: string, tipoTransporte: string) {
    const transporte = await this.transporteRepository.findOneBy({
      tipoTransporte: tipoTransporte,
    });
    if (!transporte) {
      throw new NotFoundException('El modo de viaje no existe');
    }

    const viaje = await this.viajeRepository.findOneBy({ id });

    if (!viaje) {
      throw new NotFoundException('No se encontró el viaje');
    }

    Object.assign(viaje, { transporte });
  }

  async updateViajeModo(id: string, tipoModo: string) {
    const modo = await this.modoRepository.findOneBy({ tipoModo: tipoModo });
    if (!modo) {
      throw new NotFoundException('El modo de viaje no existe');
    }

    const viaje = await this.viajeRepository.findOneBy({ id });

    if (!viaje) {
      throw new NotFoundException('No se encontró el viaje');
    }

    Object.assign(viaje, { modo });
  }

  async deleteViaje(id: string) {
    const viaje = await this.viajeRepository.findOneBy({ id });

    if (!viaje) {
      throw new NotFoundException('No se encontró el viaje');
    }

    return await this.viajeRepository.remove(viaje);
  }
}
