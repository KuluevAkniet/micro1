import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {

    return {
      type: 'postgres',
      host: this.configService.get('POSTGRES_HOST'),
      port: this.configService.get('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        path.join(__dirname, './entities/*.entity{.ts,.js}')
      ],
      migrations: [
        path.join(__dirname, './migrations/*{.ts,.js}')
      ],
      useUTC: true,
    };
  }
}
