import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Development } from './development.entity.js';
import { DevelopmentPartLandUse } from './development-part-land-use.entity.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'development_part',
})
export class DevelopmentPart {
  @PrimaryColumn({
    name: 'development_part_id',
    type: 'text',
  })
  developmentPartId: string;

  @Column({
    name: 'development_id',
    type: 'uuid',
  })
  developmentId: string;

  @Column({
    name: 'dev_key',
    type: 'text',
  })
  devKey: string;

  @Column({
    name: 'permit_number',
    type: 'text',
    nullable: true,
  })
  permitNumber: string | null;

  @Column({
    name: 'model_status',
    type: 'text',
    nullable: true,
  })
  modelStatus: string | null;

  @Column({
    name: 'shape_type',
    type: 'text',
    nullable: true,
  })
  shapeType: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string | null;

  @Column({
    name: 'num_floors',
    type: 'numeric',
    nullable: true,
  })
  numFloors: string | null;

  @Column({
    name: 'base_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  baseAhdM: string | null;

  @Column({
    name: 'top_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  topAhdM: string | null;

  @Column({
    name: 'approx_height_m',
    type: 'numeric',
    nullable: true,
  })
  approxHeightM: string | null;

  @Column({
    name: 'model_date',
    type: 'date',
    nullable: true,
  })
  modelDate: Date | null;

  @Column({
    name: 'component_number',
    type: 'integer',
    nullable: true,
  })
  componentNumber: number | null;

  @Column({
    name: 'component_count',
    type: 'integer',
    nullable: true,
  })
  componentCount: number | null;

  @Column({
    name: 'footprint_area_m2',
    type: 'numeric',
    nullable: true,
  })
  footprintAreaM2: string | null;

  @Column({
    name: 'height_valid',
    type: 'boolean',
    default: false,
  })
  heightValid: boolean;

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

  @ManyToOne(() => Development, (development) => development.parts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'development_id' })
  development: Awaited<Development>;

  @OneToMany(() => DevelopmentPartLandUse, (landUse) => landUse.developmentPart)
  landUses: DevelopmentPartLandUse[];
}
