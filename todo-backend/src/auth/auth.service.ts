import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/registrer.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //registro usuario
  async register({ email, password }: RegisterDto) {
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
}
