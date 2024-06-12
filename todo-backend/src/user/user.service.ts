import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //crear usuario
  async crearUsuario(usuarioDto: CreateUserDto) {
    const usuario = {
      ...usuarioDto,
    };

    return await this.userRepository.save(usuario);
  }

  //obtener todos usuarios
  async obtenerUsuarios() {
    const users = await this.userRepository.find();
    if (!users) {
      return new NotFoundException('No hay usuarios registrados');
    }
    return users;
  }
  //obtener un usuario
  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }
    return user;
  }

  //buscar usuario por correo
  async getByEmail(email: string) {
    const user = await this.userRepository.find({ where: { email } });

    if (!user) {
      return new NotFoundException('No se encontro usuario papi');
    }
    return user;
  }
}
