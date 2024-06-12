import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserDtoInterceptor } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Serialize(UserDtoInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.crearUsuario(createUserDto);
  }

  @Get('/list')
  async getUsers() {
    return this.userService.obtenerUsuarios();
  }

  @Get('/search/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('/search/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }
}
