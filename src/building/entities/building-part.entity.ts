import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from './building.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'building_part' })
@Index('idx_v2_building_part_building_id', ['buildingId'])
export class BuildingPart {
  @PrimaryGeneratedColumn('uuid', { name: 'building_part_id' })
  buildingPartId: string;

  @Column({
    name: 'building_id',
    type: 'uuid',
  })
  buildingId: string;

  @Column({
    name: 'objectid',
    type: 'text',
    unique: true,
  })
  objectId: string;

  @Column({
    name: 'footprint_type',
    type: 'text',
    nullable: true,
  })
  footprintType: string | null;

  @Column({
    name: 'roof_type',
    type: 'text',
    nullable: true,
  })
  roofType: string | null;

  @Column({
    name: 'footprint_min_elevation_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  footprintMinElevationAhdM: string | null;

  @Column({
    name: 'footprint_max_elevation_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  footprintMaxElevationAhdM: string | null;

  @Column({
    name: 'footprint_extrusion_m',
    type: 'numeric',
    nullable: true,
  })
  footprintExtrusionM: string | null;

  @Column({
    name: 'calculated_extrusion_m',
    type: 'numeric',
    nullable: true,
  })
  calculatedExtrusionM: string | null;

  @Column({
    name: 'relative_base_height_m',
    type: 'numeric',
    nullable: true,
  })
  relativeBaseHeightM: string | null;

  @Column({
    name: 'relative_top_height_m',
    type: 'numeric',
    nullable: true,
  })
  relativeTopHeightM: string | null;

  @Column({
    name: 'footprint_area_m2',
    type: 'numeric',
    nullable: true,
  })
  footprintAreaM2: string | null;

  @Column({
    name: 'ready_for_3d',
    type: 'boolean',
    default: false,
  })
  readyFor3d: boolean;

  @Index('idx_v2_building_part_geometry')
  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
  })
  geometry: object;

  @Column({
    name: 'import_id',
    type: 'uuid',
  })
  importId: string;

  @ManyToOne(() => Building, (building) => building.parts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'building_id' })
  building: Awaited<Building>;
}
