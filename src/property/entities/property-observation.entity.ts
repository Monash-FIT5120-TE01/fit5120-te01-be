import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Property } from './property.entity.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'property_observation',
})
@Index('idx_v2_property_observation_census_year', ['censusYear'])
export class PropertyObservation {
  @PrimaryColumn({
    name: 'property_id',
    type: 'text',
  })
  propertyId: string;

  @PrimaryColumn({
    name: 'census_year',
    type: 'smallint',
  })
  censusYear: number;

  @ManyToOne(() => Property, (property) => property.observations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property: Awaited<Property>;

  @Column({
    name: 'building_name',
    type: 'text',
    nullable: true,
  })
  buildingName: string | null;

  @Column({
    name: 'street_address',
    type: 'text',
    nullable: true,
  })
  streetAddress: string | null;

  @Column({
    name: 'clue_small_area',
    type: 'text',
    nullable: true,
  })
  clueSmallArea: string | null;

  @Column({
    name: 'construction_year',
    type: 'smallint',
    nullable: true,
  })
  constructionYear: number | null;

  @Column({
    name: 'refurbished_year',
    type: 'smallint',
    nullable: true,
  })
  refurbishedYear: number | null;

  @Column({
    name: 'floors_above_ground',
    type: 'numeric',
    nullable: true,
  })
  floorsAboveGround: string | null;

  @Column({
    name: 'predominant_space_use',
    type: 'text',
    nullable: true,
  })
  predominantSpaceUse: string | null;

  @Column({
    name: 'accessibility_type',
    type: 'text',
    nullable: true,
  })
  accessibilityType: string | null;

  @Column({
    name: 'accessibility_type_description',
    type: 'text',
    nullable: true,
  })
  accessibilityTypeDescription: string | null;

  @Column({
    name: 'accessibility_rating',
    type: 'numeric',
    nullable: true,
  })
  accessibilityRating: string | null;

  @Column({
    name: 'bicycle_spaces',
    type: 'numeric',
    nullable: true,
  })
  bicycleSpaces: string | null;

  @Column({
    name: 'has_showers',
    type: 'boolean',
    nullable: true,
  })
  hasShowers: boolean | null;

  @Column({
    name: 'longitude',
    type: 'double precision',
    nullable: true,
  })
  longitude: number | null;

  @Column({
    name: 'latitude',
    type: 'double precision',
    nullable: true,
  })
  latitude: number | null;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: object | null;

  @Column({
    name: 'has_valid_coordinates',
    type: 'boolean',
    nullable: true,
  })
  hasValidCoordinates: boolean | null;

  @Column({
    name: 'within_melbourne_bounds',
    type: 'boolean',
    nullable: true,
  })
  withinMelbourneBounds: boolean | null;

  @Column({
    name: 'invalid_construction_year',
    type: 'boolean',
    nullable: true,
  })
  invalidConstructionYear: boolean | null;

  @Column({
    name: 'invalid_refurbished_year',
    type: 'boolean',
    nullable: true,
  })
  invalidRefurbishedYear: boolean | null;

  @Column({
    name: 'suspicious_floor_count',
    type: 'boolean',
    nullable: true,
  })
  suspiciousFloorCount: boolean | null;

  @Column({
    name: 'building_age_at_census',
    type: 'numeric',
    nullable: true,
  })
  buildingAgeAtCensus: string | null;

  @Column({
    name: 'import_id',
    type: 'uuid',
  })
  importId: string;
}
