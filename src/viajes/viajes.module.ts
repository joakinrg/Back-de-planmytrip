import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModoViajeModule } from '../modo-viaje/modo-viaje.module';
import { TransporteModule } from '../transporte/transporte.module';
import { UserModule } from '../user/user.module';
import { Viaje } from './entity/Viaje.entity';
import { ViajesController } from './viajes.controller';
import { ViajesService } from './viajes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Viaje]),
    UserModule,
    ModoViajeModule,
    TransporteModule,
  ],
  providers: [ViajesService],
  controllers: [ViajesController],
  exports: [TypeOrmModule],
})
export class ViajesModule {}
