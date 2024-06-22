import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateModoViajeDto } from './dto/create-modo-viaje.dto';
import { UpdateModoViajeDto } from './dto/update-modo-viaje.dto';
import { ModoViajeService } from './modo-viaje.service';

@Controller('modo')
export class ModoViajeController {
  constructor(private readonly modoViajeService: ModoViajeService) {}

  @Post('/add')
  create(@Body() createModoViajeDto: CreateModoViajeDto) {
    return this.modoViajeService.create(createModoViajeDto);
  }

  @Get('/list')
  findAll() {
    return this.modoViajeService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.modoViajeService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateModoViajeDto: UpdateModoViajeDto,
  ) {
    return this.modoViajeService.update(id, updateModoViajeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.modoViajeService.remove(id);
  }
}
