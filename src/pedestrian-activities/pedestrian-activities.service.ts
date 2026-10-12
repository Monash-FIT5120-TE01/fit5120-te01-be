import {
  Injectable,
  OnModuleInit,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedestrianCount } from './entities/pedestrian-count.entity.js';
import { Repository } from 'typeorm';
import { PedestrianCountSensor } from './entities/pedestrian-count-sensor.entity.js';
import { ForecastResponse } from './entities/pedestrian-forecast.js';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';

@Injectable()
export class PedestrianActivitiesService implements OnModuleInit {
  private readonly logger = new Logger(PedestrianActivitiesService.name);
  private cachedForecastData: ForecastResponse;

  constructor(
    @InjectRepository(PedestrianCount)
    private readonly _pedCountRepository: Repository<PedestrianCount>,

    @InjectRepository(PedestrianCountSensor)
    private readonly _pedCountSensorRepository: Repository<PedestrianCountSensor>,

    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.loadForecastData();
  }

  private async loadForecastData() {
    const filePath = this.configService.get<string>('FORECAST_PATH');

    if (!filePath) {
      throw new Error('FORECAST_PATH is not configured');
    }

    try {
      const content = await readFile(filePath, 'utf8');
      const newData = JSON.parse(content);

      // Update the cache only when reading and parsing succeed.
      this.cachedForecastData = newData;

      this.logger.log('JSON file loaded successfully');
    } catch (error) {
      this.logger.error(
        'Failed to load JSON file',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  @Cron('25 */2 * * *')
  async refreshForecastCache() {
    await this.loadForecastData();
  }

  async getAllSensors(): Promise<PedestrianCountSensor[]> {
    const query = await this._pedCountSensorRepository.find();
    return query;
  }

  async getLatestHourCount(
    hours?: number,
    sensorId?: number,
  ): Promise<PedestrianCount[]> {
    let result: Array<PedestrianCount> = [];
    if (hours === undefined) hours = 1;

    // Step 1: Get the maximum timestamp from the table
    const maxResult = await this._pedCountRepository
      .createQueryBuilder('pc')
      .select('MAX(pc.timestamp)', 'maxTimestamp')
      .getRawOne<{ maxTimestamp: Date | string }>();

    if (maxResult?.maxTimestamp) {
      const latestTimestamp = new Date(maxResult.maxTimestamp);

      // Calculate the cutoff date X hours prior
      const cutoffTimestamp = new Date(latestTimestamp);
      cutoffTimestamp.setHours(cutoffTimestamp.getHours() - hours);

      // Step 2: Fetch all records within the window
      if (sensorId === undefined) {
        // Get all
        result = await this._pedCountRepository
          .createQueryBuilder('pc')
          .where('pc.timestamp >= :cutoffTimestamp', { cutoffTimestamp })
          .andWhere('pc.timestamp <= :latestTimestamp', { latestTimestamp })
          .orderBy('pc.location_id', 'ASC')
          .addOrderBy('pc.timestamp', 'DESC')
          .getMany();
      } else {
        // Get historical data of a specific sensor
        result = await this._pedCountRepository
          .createQueryBuilder('pc')
          .where('pc.timestamp >= :cutoffTimestamp', { cutoffTimestamp })
          .andWhere('pc.timestamp <= :latestTimestamp', { latestTimestamp })
          .andWhere('pc.location_id = :sensorId', { sensorId })
          .orderBy('pc.location_id', 'ASC')
          .addOrderBy('pc.timestamp', 'DESC')
          .getMany();
      }
    }

    return result;
  }

  async getForecastData(hours: number, sensorId?: number) {
    // Filter by sensor id if sensorId is provided
    let forecasts = this.cachedForecastData.forecasts;
    if (sensorId !== undefined) {
      forecasts = forecasts.filter(
        (forecast) => forecast.sensor.id === sensorId,
      );
      if (forecasts.length === 0)
        throw new NotFoundException(`Sensor id ${sensorId} not found`);
    }

    return {
      generated_at: this.cachedForecastData.generated_at,
      timezone: this.cachedForecastData.timezone,
      forecasts: forecasts.map((forecast) => ({
        ...forecast,
        hourly: forecast.hourly.slice(0, hours),
      })),
    };
  }
}
