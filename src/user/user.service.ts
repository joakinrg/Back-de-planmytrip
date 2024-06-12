import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePersonaDto } from './dtos/updatePersona.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async crearUsuario(usuarioDto: CreateUserDto) {
    const alreadyExists = await this.userRepository.find({
      where: { email: usuarioDto.email },
    });

    if (alreadyExists.length > 0) {
      throw new BadRequestException('el correo ya esta registrado papito');
    }

    const persona = {
      nombre: usuarioDto.nombre,
      apellidoP: usuarioDto.apellidoP,
      apellidoM: usuarioDto.apellidoM,
    };

    const usuario = {
      ...usuarioDto,
      persona,
    };

    return await this.userRepository.save(usuario);
  }

  async obtenerUsuarios() {
    const users = await this.userRepository.find();
    if (!users) {
      return new NotFoundException('No hay usuarios registrados');
    }
    return users;
  }

  async getById(id: string): Promise<User | NotFoundException> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.find({ where: { email } });

    if (!user) {
      return new NotFoundException('No se encontro usuario papi');
    }
    return user;
  }

  async updatePersona(id: string, newData: Partial<UpdatePersonaDto>) {
    const user = (await this.getById(id)) as User;

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }

    Object.assign(user.persona, newData);

    return await this.userRepository.save(user);
  }

  async updateEmail(id: string, email: string) {
    const user = (await this.getById(id)) as User;

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }

    const alreadyExists = await this.getByEmail(email);

    if (!alreadyExists) {
      throw new BadRequestException(
        'El correo ingresado ya se encuentra registrado',
      );
    }

    Object.assign(user, { email });

    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, password: string) {
    const user = (await this.getById(id)) as User;

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    Object.assign(user, { password: hashedPassword });

    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.getById(id);

    if (!user) {
      return new NotFoundException('No se encontro el usuario papi');
    }

    return await this.userRepository.delete(id);
  }
}
