import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AdminService } from '../admin/admin.service';
import { LoginDto } from './dtos/Login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly adminSevice: AdminService,
  ) {}

  //registro usuario
  async register({
    email,
    password,
    nombre,
    apellidoM,
    apellidoP,
  }: RegisterDto) {
    const alreadyExists = await this.userService.getByEmail(email);

    if (alreadyExists[0]) {
      throw new BadRequestException('el correo ya esta registrado papito');
    }
    //hashear
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userService.crearUsuario({
      email,
      password: hashedPassword,
      nombre,
      apellidoM,
      apellidoP,
    });

    return user;
  }

  //inicio sesion
  async login({ email, password }: LoginDto) {
    const [user] = (await this.userService.getByEmail(email)) as any;

    if (!user) {
      throw new NotFoundException('Usuario no encontrado papi');
    }

    const storedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, storedPassword);

    if (!checkPassword) {
      throw new BadRequestException('Contraseña incorrecrta mi rey');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return { token, email: user.email };
  }

  // Inicio de sesion admin
  async loginAdmin({ email, password }: LoginDto) {
    const [admin] = (await this.adminSevice.getByEmail(email)) as any;

    if (!admin) {
      throw new NotFoundException('Usuario no encontrado papi');
    }

    const storedPasword = admin.contrasena;
    const passwordCheck = await bcrypt.compare(password, storedPasword);

    if (!passwordCheck) {
      throw new BadRequestException('Contraseña incorrecrta mi rey');
    }

    const payload = {
      sub: admin.id,
      email: admin.correo,
    };

    const token = this.jwtService.sign(payload);

    return { token, email: admin.correo };
  }
}
