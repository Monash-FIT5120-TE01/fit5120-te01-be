import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BuildingModule } from './building/building.module.js';
import { DevelopmentModule } from './development/development.module.js';
import { PropertyModule } from './property/property.module.js';

const environment = process.env.NODE_ENV || 'local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${environment}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    BuildingModule,
    DevelopmentModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
