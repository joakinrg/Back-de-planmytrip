import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/CreateAdmin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() newAdmin: CreateAdminDto) {
    return await this.adminService.crearAdmin(newAdmin);
  }

  @Get()
  async getAdmins() {
    return await this.adminService.obtenerAdmins();
  }

  @Get('/:id')
  async getAdminById(@Param() id: string) {
    return await this.adminService.getById(id);
  }

  @Get('/:email')
  async getAdminByEmail(@Param() email: string) {
    return await this.adminService.getByEmail(email);
  }
}
