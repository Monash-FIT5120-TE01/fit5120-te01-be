import { Controller, Get, Query } from '@nestjs/common';
import { PedestrianActivitiesService } from './pedestrian-activities.service.js';
import { PedestrianCountQueryDto } from './dtos/forecast.dto.js';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/pedestrian-activities')
@ApiTags('Pedestrian movements')
export class PedestrianActivitiesController {
  constructor(
    private readonly pedestrianActivitiesService: PedestrianActivitiesService,
  ) {}

  @Get('/sensors')
  async getAllSensors() {
    return await this.pedestrianActivitiesService.getAllSensors();
  }

  @Get('/recent')
  async getRecentHourCount() {
    return await this.pedestrianActivitiesService.getLatestHourCount(1);
  }

  @Get('/history')
  async getHistoricalHourlyCount(@Query() pcQueryDto: PedestrianCountQueryDto) {
    const hours = pcQueryDto.hours ? pcQueryDto.hours : 24;
    return await this.pedestrianActivitiesService.getLatestHourCount(
      hours,
      pcQueryDto.sensorId,
    );
  }

  @Get('/forecast')
  async getForecastData(@Query() pcQueryDto: PedestrianCountQueryDto) {
    const hours = pcQueryDto.hours ? pcQueryDto.hours : 24;
    return await this.pedestrianActivitiesService.getForecastData(
      hours,
      pcQueryDto.sensorId,
    );
  }
}
