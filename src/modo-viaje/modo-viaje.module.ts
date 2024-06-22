import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modo } from './entities/modo-viaje.entity';
import { ModoViajeController } from './modo-viaje.controller';
import { ModoViajeService } from './modo-viaje.service';

@Module({
  imports: [TypeOrmModule.forFeature([Modo])],
  controllers: [ModoViajeController],
  providers: [ModoViajeService],
  exports: [TypeOrmModule],
})
export class ModoViajeModule {}
