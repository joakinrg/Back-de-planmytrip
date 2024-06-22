import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        //* Production
        // url: ConfigService.get('MYSQL_URL'),
        // synchronize: false,

        //* Development
        host: ConfigService.getOrThrow('MYSQL_HOST'),
        port: ConfigService.getOrThrow('MYSQL_PORT'),
        database: ConfigService.getOrThrow('MYSQL_DATABASE'),
        username: ConfigService.getOrThrow('MYSQL_USERNAME'),
        password: ConfigService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: ConfigService.get('MYSQL_SYNCRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
