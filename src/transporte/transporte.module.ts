import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transporte } from './entities/transporte.entity';
import { TransporteController } from './transporte.controller';
import { TransporteService } from './transporte.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transporte])],
  controllers: [TransporteController],
  providers: [TransporteService],
  exports: [TypeOrmModule],
})
export class TransporteModule {}
