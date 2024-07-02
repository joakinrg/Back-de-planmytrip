import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdatePersonaDto } from './dtos/updatePersona.dto';
import { UserDtoInterceptor } from './dtos/user.dto';
import { UserService } from './user.service';

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
    return this.userService.findUserById(id);
  }

  @Get('/search/email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getByEmail(email);
  }

  @Patch('/persona/:id')
  async updateUserPersona(
    @Param('id') id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.userService.updatePersona(id, updatePersonaDto);
  }

  @Patch('/email/:id')
  async updateUserEmail(@Param('id') id: string, @Body() email: string) {
    return this.userService.updateEmail(id, email);
  }

  @Patch('/password/:id')
  async updateUserPassword(@Param('id') id: string, @Body() password: string) {
    return this.userService.updatePassword(id, password);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
