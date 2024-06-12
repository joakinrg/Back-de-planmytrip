import { Module } from '@nestjs/common';
import { TareastodoService } from './tareastodo.service';
import { Tareastodo } from './entities/tareastodo.entity';
import { TareastodoController } from './tareastodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tareastodo])],
  controllers: [TareastodoController],
  providers: [TareastodoService],
})
export class TareastodoModule {}
