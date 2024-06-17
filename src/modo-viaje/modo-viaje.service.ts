import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModoViajeDto } from './dto/create-modo-viaje.dto';
import { UpdateModoViajeDto } from './dto/update-modo-viaje.dto';
import { Modo } from './entities/modo-viaje.entity';

@Injectable()
export class ModoViajeService {
  constructor(
    @InjectRepository(Modo)
    private readonly modoViajeRepository: Repository<Modo>,
  ) {}

  async create(createModoViaje: CreateModoViajeDto) {
    const alreadyExists = await this.modoViajeRepository.findOne({
      where: { tipoModo: createModoViaje.tipoModo },
    });
    if (alreadyExists) {
      throw new BadRequestException('Modo de viaje already exists');
    }

    const modo = { ...createModoViaje };

    return await this.modoViajeRepository.save(modo);
  }

  async findAll() {
    const [modos] = await this.modoViajeRepository.findAndCount();

    if (!modos) {
      throw new NotFoundException('No se encontraron modos de viaje');
    }

    return modos;
  }

  async findOne(id: string) {
    const modo = await this.modoViajeRepository.findOneBy({ id });

    if (!modo) {
      throw new NotFoundException('Modo de viaje no encontrado');
    }

    return modo;
  }

  async update(id: string, updateModoViajeDto: Partial<UpdateModoViajeDto>) {
    const modo = await this.modoViajeRepository.findOneBy({ id });

    if (!modo) {
      throw new NotFoundException('Modo de viaje no encontrado');
    }

    Object.assign(modo, updateModoViajeDto);

    return await this.modoViajeRepository.save(modo);
  }

  async remove(id: string) {
    const modo = await this.modoViajeRepository.findOneBy({ id });

    if (!modo) {
      throw new NotFoundException('Modo de viaje no encontrado');
    }

    return await this.modoViajeRepository.remove(modo);
  }
}
