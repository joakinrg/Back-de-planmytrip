import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TareastodoService } from './tareastodo.service';
import { CreateTareastodoDto } from './dto/create-tareastodo.dto';
import { UpdateTareastodoDto } from './dto/update-tareastodo.dto';

@Controller('tareastodo')
export class TareastodoController {
  constructor(private readonly tareastodoService: TareastodoService) {}

  @Post()
  create(@Body() createTareastodoDto: CreateTareastodoDto) {
    return this.tareastodoService.create(createTareastodoDto);
  }

  @Get()
  findAll() {
    return this.tareastodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareastodoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTareastodoDto: UpdateTareastodoDto,
  ) {
    return this.tareastodoService.update(+id, updateTareastodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareastodoService.remove(+id);
  }
}
