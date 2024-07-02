import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/CreateAdmin.dto';
import { Admin } from './entity/Admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async crearAdmin(newAdmin: CreateAdminDto) {
    const alreadyExists = await this.adminRepository.find({
      where: { correo: newAdmin.correo },
    });

    if (alreadyExists.length > 0) {
      throw new BadRequestException(
        'Ese correo ya tiene un administrador asociado',
      );
    }

    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(newAdmin.contrasena, salt);

    const createdAdmin = {
      ...newAdmin,
      contrasena: hashedPassword,
    };

    return await this.adminRepository.save(createdAdmin);
  }

  async obtenerAdmins() {
    const [admins] = await this.adminRepository.find();

    if (!admins) {
      return new NotFoundException('No hay administradores registrados');
    }

    return admins;
  }

  async getById(id: string) {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      return new NotFoundException('No se encontro el administrador');
    }

    return admin;
  }

  async getByEmail(correo: string) {
    const admin = await this.adminRepository.find({ where: { correo } });

    if (!admin) {
      return new NotFoundException('No se encontro administrador');
    }

    return admin;
  }
}
