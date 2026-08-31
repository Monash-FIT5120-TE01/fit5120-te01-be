import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Building } from '../../building/entities/building.entity.js';
import { Property } from './property.entity.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'property_building_link',
})
@Index('idx_v2_property_building_link_building', ['buildingId'])
@Index('idx_v2_property_building_link_match_run', ['matchRunId'])
export class PropertyBuildingLink {
  @PrimaryColumn({
    name: 'property_id',
    type: 'text',
  })
  propertyId: string;

  @PrimaryColumn({
    name: 'building_id',
    type: 'uuid',
  })
  buildingId: string;

  @PrimaryColumn({
    name: 'match_run_id',
    type: 'uuid',
  })
  matchRunId: string;

  @PrimaryColumn({
    name: 'match_method',
    type: 'text',
  })
  matchMethod: string;

  @ManyToOne(() => Property, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'property_id',
  })
  property: Property;

  @ManyToOne(() => Building, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'building_id',
  })
  building: Awaited<Building>;

  @Column({
    name: 'match_confidence',
    type: 'numeric',
    nullable: true,
  })
  matchConfidence: string | null;

  @Column({
    name: 'distance_m',
    type: 'numeric',
    nullable: true,
  })
  distanceM: string | null;

  @Column({
    name: 'point_inside_or_touching',
    type: 'boolean',
    nullable: true,
  })
  pointInsideOrTouching: boolean | null;

  @Column({
    name: 'covering_building_count',
    type: 'integer',
    nullable: true,
  })
  coveringBuildingCount: number | null;

  @Column({
    name: 'boundary_distance_m',
    type: 'numeric',
    nullable: true,
  })
  boundaryDistanceM: string | null;

  @Column({
    name: 'review_status',
    type: 'text',
    default: 'candidate',
  })
  reviewStatus: string;

  @Column({
    name: 'review_notes',
    type: 'text',
    nullable: true,
  })
  reviewNotes: string | null;

  @Column({
    name: 'reviewed_at',
    type: 'timestamptz',
    nullable: true,
  })
  reviewedAt: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;
}
