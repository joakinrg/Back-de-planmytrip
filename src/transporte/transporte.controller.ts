import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTransporteDto } from './dto/create-transporte.dto';
import { UpdateTransporteDto } from './dto/update-transporte.dto';
import { TransporteService } from './transporte.service';

@Controller('transporte')
export class TransporteController {
  constructor(private readonly transporteService: TransporteService) {}

  @Post('/add')
  create(@Body() createTransporteDto: CreateTransporteDto) {
    return this.transporteService.create(createTransporteDto);
  }

  @Get('/list')
  findAll() {
    return this.transporteService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.transporteService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateTransporteDto: UpdateTransporteDto,
  ) {
    return this.transporteService.update(id, updateTransporteDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.transporteService.remove(id);
  }
}
