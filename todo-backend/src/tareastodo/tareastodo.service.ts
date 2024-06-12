import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareastodoDto } from './dto/create-tareastodo.dto';
import { UpdateTareastodoDto } from './dto/update-tareastodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tareastodo } from './entities/tareastodo.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TareastodoService {
  //constructor
  constructor(
    @InjectRepository(Tareastodo)
    private readonly tareaRepository: Repository<Tareastodo>,
  ) {}
  async create(createTareastodoDto: CreateTareastodoDto) {
    const tarea = {
      ...createTareastodoDto,
    };
    return await this.tareaRepository.save(tarea);
  }

  //encontrar tareas
  findAll() {
    const tareas = this.tareaRepository.find();

    if (!tareas) {
      throw new NotFoundException('No se encontraron tareitas mi bro');
    }
    return tareas;
  }

  async findOne(id: number) {
    const tarea = await this.tareaRepository.find({ where: { id } });

    if (tarea[0] === undefined) {
      throw new NotFoundException(
        `No se encontraron la tarea con el ID ${id} mi bro`,
      );
    }
    return tarea;
  }

  async update(id: number, data: Partial<UpdateTareastodoDto>) {
    const tarea = await this.tareaRepository.findOneBy({ id });
    console.log(tarea);
    if (!tarea) {
      throw new NotFoundException(
        `No se encontraron la tarea con el ID ${id} mi bro`,
      );
    }

    Object.assign(tarea, data);

    return await this.tareaRepository.save(tarea);
  }

  async remove(id: number) {
    const tarea = await this.tareaRepository.find({ where: { id } });

    if (tarea[0] === undefined) {
      throw new NotFoundException(
        `No se encontraron la tarea con el ID ${id} mi bro`,
      );
    }
    return await this.tareaRepository.remove(tarea);
  }
}
