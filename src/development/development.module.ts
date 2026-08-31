import { Module } from '@nestjs/common';
import { DevelopmentService } from './development.service.js';
import { DevelopmentController } from './development.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Development } from './entities/development.entity.js';
import { DevelopmentPart } from './entities/development-part.entity.js';
import { DevelopmentPartLandUse } from './entities/development-part-land-use.entity.js';
import { DevelopmentObservation } from './entities/development-observation.entity.js';
import { DevelopmentActivityModelInfoView } from './entities/development-view.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Development,
      DevelopmentPart,
      DevelopmentPartLandUse,
      DevelopmentObservation,
      DevelopmentActivityModelInfoView,
    ]),
  ],
  controllers: [DevelopmentController],
  providers: [DevelopmentService],
})
export class DevelopmentModule {}
