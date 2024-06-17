import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ViajesModule } from './viajes/viajes.module';
import { TransporteModule } from './transporte/transporte.module';
import { ModoViajeModule } from './modo-viaje/modo-viaje.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    AdminModule,
    ViajesModule,
    TransporteModule,
    ModoViajeModule,
  ],
})
export class AppModule {}
