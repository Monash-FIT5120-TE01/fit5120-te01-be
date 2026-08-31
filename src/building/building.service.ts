import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity.js';
import { Repository } from 'typeorm';
import { BuildingFootprintResponseDto } from './dtos/building-footprint-response.dto.js';
import {
  ExistingBuildingInfoView,
  PropertyDetails,
} from './entities/building-info-view.entity.js';
import { BuildingInfoResponseDto } from './dtos/building-info.dto.js';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly _buildingRepository: Repository<Building>,

    @InjectRepository(ExistingBuildingInfoView)
    private readonly _existingBuildingInfoViewRepo: Repository<ExistingBuildingInfoView>,
  ) {}

  async findAllFootprints(): Promise<BuildingFootprintResponseDto> {
    const query = await this._buildingRepository
      .createQueryBuilder('building')
      .select([
        'building.buildingId',
        'building.structureId',
        'building.componentCount',
        'building.structureMinElevationAhdM',
        'building.structureMaxElevationAhdM',
        'building.structureHeightM',
        'building_part.buildingPartId',
        'building_part.objectId',
        'building_part.footprintType',
        'building_part.roofType',
        'building_part.footprintMinElevationAhdM',
        'building_part.footprintMaxElevationAhdM',
        'building_part.footprintExtrusionM',
        'building_part.calculatedExtrusionM',
        'building_part.relativeBaseHeightM',
        'building_part.relativeTopHeightM',
        'building_part.footprintAreaM2',
        'ST_AsGeoJSON(building_part.geometry)::jsonb AS geometry',
      ])
      .innerJoinAndSelect('building.parts', 'building_part')
      .getRawMany();

    const res = {
      type: 'FeatureCollection',
      name: '2023 Building Footprint - Melbourne CBD',
      features: query.map((row) => ({
        type: 'Feature',
        id: row['building_part_building_part_id'],
        objectId: row['building_part_objectid'],
        geometry: row['building_part_geometry'],
        properties: {
          buildingId: row['building_building_id'],
          structureId: row['building_structure_id'],
          componentCount: row['building_component_count'],
          structureMinElevationAhdM:
            row['building_structure_min_elevation_ahd_m'],
          structureMaxElevationAhdM:
            row['building_structure_max_elevation_ahd_m'],
          structureHeightM: row['building_structure_height_m'],
          footprintType: row['building_part_footprint_type'],
          roofType: row['building_part_roof_type'],
          footprintMinElevationAhdM:
            row['building_part_footprint_min_elevation_ahd_m'],
          footprintMaxElevationAhdM:
            row['building_part_footprint_max_elevation_ahd_m'],
          footprintExtrusionM: row['building_part_footprint_extrusion_m'],
          calculatedExtrusionM: row['building_part_calculated_extrusion_m'],
          relativeBaseHeightM: row['building_part_relative_base_height_m'],
          relativeTopHeightM: row['building_part_component_count'],
          footprintAreaM2: row['building_part_footprint_area_m2'],
        },
      })),
    };

    return res;
  }

  async findBuildingDetails(
    id: string,
  ): Promise<BuildingInfoResponseDto | null> {
    const query: ExistingBuildingInfoView | null =
      await this._existingBuildingInfoViewRepo.findOne({
        where: { building_id: id },
      });

    return query
      ? {
          buildingId: id,
          height: query.structure_height_m,
          details:
            query.properties_details.length > 0
              ? query.properties_details[0]
              : {},
        }
      : null;
  }
}
