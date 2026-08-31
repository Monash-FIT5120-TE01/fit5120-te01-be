import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Development } from './development.entity.js';
import { DevelopmentStatus } from '../enum/development-status.enum.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'development_observation',
})
export class DevelopmentObservation {
  @PrimaryColumn({
    name: 'development_id',
    type: 'uuid',
  })
  developmentId: string;

  @PrimaryColumn({
    name: 'observed_at',
    type: 'date',
  })
  observedAt: Date;

  @ManyToOne(() => Development, (development) => development.observations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'development_id' })
  development: Awaited<Development>;

  @Column({
    type: 'enum',
    enum: DevelopmentStatus,
  })
  status: DevelopmentStatus;

  @Column({
    name: 'year_completed',
    type: 'smallint',
    nullable: true,
  })
  yearCompleted: number | null;

  @Column({
    name: 'floors_above',
    type: 'numeric',
    nullable: true,
  })
  floorsAbove: string | null;

  @Column({
    name: 'residential_units',
    type: 'numeric',
    nullable: true,
  })
  residentialUnits: string | null;

  @Column({
    name: 'residential_total_source',
    type: 'text',
    nullable: true,
  })
  residentialTotalSource: string | null;

  @Column({
    name: 'office_floor_area_m2',
    type: 'numeric',
    nullable: true,
  })
  officeFloorAreaM2: string | null;

  @Column({
    name: 'retail_floor_area_m2',
    type: 'numeric',
    nullable: true,
  })
  retailFloorAreaM2: string | null;

  @Column({
    name: 'industrial_floor_area_m2',
    type: 'numeric',
    nullable: true,
  })
  industrialFloorAreaM2: string | null;

  @Column({
    name: 'education_floor_area_m2',
    type: 'numeric',
    nullable: true,
  })
  educationFloorAreaM2: string | null;

  @Column({
    name: 'total_floor_area_m2',
    type: 'numeric',
    nullable: true,
  })
  totalFloorAreaM2: string | null;

  @Column({
    name: 'car_spaces',
    type: 'numeric',
    nullable: true,
  })
  carSpaces: string | null;

  @Column({
    name: 'bike_spaces',
    type: 'numeric',
    nullable: true,
  })
  bikeSpaces: string | null;

  @Column({
    name: 'import_id',
    type: 'uuid',
  })
  importId: string;
}
