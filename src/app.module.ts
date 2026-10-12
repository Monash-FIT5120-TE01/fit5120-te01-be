import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BuildingModule } from './building/building.module.js';
import { DevelopmentModule } from './development/development.module.js';
import { PropertyModule } from './property/property.module.js';
import { FuturePlansModule } from './future-plans/future-plans.module.js';
import { ThrottlerModule } from '@nestjs/throttler';

const environment = process.env.NODE_ENV || 'local';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${environment}`, '.env'],
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
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 60 }],
    }),
    BuildingModule,
    DevelopmentModule,
    PropertyModule,
    FuturePlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
