import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevelopmentActivityModelInfoView } from './entities/development-view.entity.js';
import { Repository } from 'typeorm';
import { DevFootprintResponseDto } from './dtos/development-footprint-response.dto.js';
import { DevInfoResponseDto } from './dtos/development-info-response.dto.js';

@Injectable()
export class DevelopmentService {
  constructor(
    @InjectRepository(DevelopmentActivityModelInfoView)
    private readonly _damInfoViewRepo: Repository<DevelopmentActivityModelInfoView>,
  ) {}

  async findAllFootprints(): Promise<DevFootprintResponseDto> {
    const query = await this._damInfoViewRepo
      .createQueryBuilder('dam')
      .select([
        'dam.development_id AS development_id',
        'dam.development_key AS development_key',
        'dam.development_part_id AS development_part_id',
        'dam.street_address AS street_address',
        'dam.longitude AS longitude',
        'dam.latitude AS latitude',
        'dam.status AS status',
        'dam.model_status AS model_status',
        'dam.shape_type AS shape_type',
        'dam.base_ahd_m AS base_ahd_m',
        'dam.top_ahd_m AS top_ahd_m',
        'dam.approx_height_m AS approx_height_m',
        'dam.component_count AS component_count',
        'dam.footprint_area_m2 AS footprint_area_m2',
        'dam.land_uses AS land_uses',
        'ST_AsGeoJSON(dam.geometry)::jsonb AS geometry',
      ])
      .getRawMany();

    const res: DevFootprintResponseDto = {
      type: 'FeatureCollection',
      name: 'Development Activity Monitor - Melbourne CBD',
      features: query.map((row) => ({
        type: 'Feature',
        id: row['development_part_id'],
        geometry: row['geometry'],
        properties: {
          devId: row['development_id'],
          devKey: row['development_key'],
          streetAddress: row['street_address'],
          longitude: row['longitude'],
          latitude: row['latitude'],
          status: row['status'],
          modelStatus: row['model_status'],
          shapeType: row['shape_type'],
          baseAhdM: row['base_ahd_m'],
          topAhdM: row['top_ahd_m'],
          approxHeightM: row['approx_height_m'],
          componentCount: row['component_count'],
          footprintAreaM2: row['footprint_area_m2'],
          landUses: row['land_uses'],
        },
      })),
    };

    return res;
  }

  async findDevDetails(id: string): Promise<DevInfoResponseDto | null> {
    const query = await this._damInfoViewRepo.findOne({
      where: { development_id: id },
    });

    if (!query) return null;

    return {
      developmentId: id,
      developmentKey: query['development_key'],
      streetAddress: query['street_address'],
      planningApplication: query['planning_application'],
      permitNumber: query['permit_number'],
      latitude: query['latitude'],
      longitude: query['longitude'],
      status: query['status'],
      modelStatus: query['model_status'],
      floorsAbove: query['floors_above'],
      residentialUnits: query['residential_units'],
      officeFloorAreaM2: query['office_floor_area_m2'],
      retailFloorAreaM2: query['retail_floor_area_m2'],
      industrialFloorAreaM2: query['industrial_floor_area_m2'],
      educationFloorAreaM2: query['education_floor_area_m2'],
      carSpaces: query['car_spaces'],
      bikeSpaces: query['bike_spaces'],
      landUses: query['land_uses'],
    };
  }
}
