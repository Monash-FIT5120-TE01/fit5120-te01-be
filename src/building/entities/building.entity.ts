import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { BuildingPart } from './building-part.entity.js';
import { PropertyBuildingLink } from '../../property/entities/property-building-link.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'building' })
export class Building {
  @PrimaryGeneratedColumn('uuid', { name: 'building_id' })
  buildingId: string;

  @Column({
    name: 'structure_id',
    type: 'text',
    unique: true,
  })
  structureId: string;

  @Column({
    name: 'capture_date',
    type: 'date',
    nullable: true,
  })
  captureDate: Date | null;

  @Column({
    name: 'component_count',
    type: 'integer',
    default: 0,
  })
  componentCount: number;

  @Column({
    name: 'structure_min_elevation_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  structureMinElevationAhdM: string | null;

  @Column({
    name: 'structure_max_elevation_ahd_m',
    type: 'numeric',
    nullable: true,
  })
  structureMaxElevationAhdM: string | null;

  @Column({
    name: 'structure_height_m',
    type: 'numeric',
    nullable: true,
  })
  structureHeightM: string | null;

  @Column({
    name: 'all_parts_3d_ready',
    type: 'boolean',
    default: false,
  })
  allParts3dReady: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;

  @OneToMany(() => BuildingPart, (buildingPart) => buildingPart.building)
  parts: Awaited<BuildingPart[]>;

  @OneToMany(() => PropertyBuildingLink, (link) => link.building)
  propertyLinks: Awaited<PropertyBuildingLink[]>;
}
