import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateViajeDto } from './dto/CreateViaje.dto';
import { UpdateViajeDto } from './dto/UpdateViaje.dto';
import { ViajesService } from './viajes.service';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  @Post('/add')
  async addViaje(@Body() createViaje: CreateViajeDto) {
    return await this.viajesService.addViaje(createViaje);
  }

  @Get('/asociados/:email')
  async getViajesAsociados(@Param('email') email: string) {
    return await this.viajesService.getViajesAsociados(email);
  }

  @Get('/:id')
  async getViaje(@Param('id') id: string) {
    return await this.viajesService.getViajeById(id);
  }

  @Patch('/:id')
  async updateViaje(
    @Param('id') id: string,
    @Body() updateViaje: UpdateViajeDto,
  ) {
    return await this.viajesService.updateViaje(id, updateViaje);
  }

  @Patch('/modo/:id')
  async updateModo(@Param('id') id: string, @Body() tipoModo: string) {
    return await this.viajesService.updateViajeModo(id, tipoModo);
  }

  @Patch('/transporte/:id')
  async updateTransporte(
    @Param('id') id: string,
    @Body() tipoTransporte: string,
  ) {
    return await this.viajesService.updateViajeTransporte(id, tipoTransporte);
  }

  @Delete('/:id')
  async deleteViaje(@Param('id') id: string) {
    return await this.viajesService.deleteViaje(id);
  }
}
