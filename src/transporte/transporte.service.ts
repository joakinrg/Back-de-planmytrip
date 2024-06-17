import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransporteDto } from './dto/create-transporte.dto';
import { UpdateTransporteDto } from './dto/update-transporte.dto';
import { Transporte } from './entities/transporte.entity';

@Injectable()
export class TransporteService {
  constructor(
    @InjectRepository(Transporte)
    private transporteRepository: Repository<Transporte>,
  ) {}

  async create(createTransporte: CreateTransporteDto) {
    const alreadyExists = await this.transporteRepository.findOne({
      where: { tipoTransporte: createTransporte.tipoTransporte },
    });

    if (alreadyExists) {
      throw new BadRequestException('El transporte ya existe');
    }

    const transporte = { ...createTransporte };

    return await this.transporteRepository.save(transporte);
  }

  async findAll() {
    const transportes = await this.transporteRepository.find();

    if (!transportes) {
      throw new NotFoundException('No hay transportes');
    }

    return transportes;
  }

  async findOne(id: string) {
    const transporte = await this.transporteRepository.findOneBy({ id });

    if (!transporte) {
      throw new NotFoundException('Transporte no encontrado');
    }

    return transporte;
  }

  async update(id: string, updateTransporte: Partial<UpdateTransporteDto>) {
    const transporte = await this.transporteRepository.findOneBy({ id });

    if (!transporte) {
      throw new NotFoundException('Transporte no encontrado');
    }

    Object.assign(transporte, updateTransporte);

    const updatedTransporte = await this.transporteRepository.save(transporte);

    if (!updatedTransporte) {
      throw new BadRequestException('Error al actualizar el transporte');
    }

    return updatedTransporte;
  }

  async remove(id: string) {
    const transporte = await this.transporteRepository.findOneBy({ id });

    if (!transporte) {
      throw new NotFoundException('Transporte no encontrado');
    }
    return await this.transporteRepository.remove(transporte);
  }
}
