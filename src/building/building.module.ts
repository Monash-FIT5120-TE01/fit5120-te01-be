import { Module } from '@nestjs/common';
import { BuildingService } from './building.service.js';
import { BuildingController } from './building.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity.js';
import { BuildingPart } from './entities/building-part.entity.js';
import { ExistingBuildingInfoView } from './entities/building-info-view.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Building,
      BuildingPart,
      ExistingBuildingInfoView,
    ]),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingModule {}
