import { Module } from '@nestjs/common';
import { PedestrianActivitiesService } from './pedestrian-activities.service.js';
import { PedestrianActivitiesController } from './pedestrian-activities.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedestrianCount } from './entities/pedestrian-count.entity.js';
import { PedestrianCountSensor } from './entities/pedestrian-count-sensor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PedestrianCount, PedestrianCountSensor])],
  controllers: [PedestrianActivitiesController],
  providers: [PedestrianActivitiesService],
})
export class PedestrianActivitiesModule {}
