import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DevelopmentObservation } from './development-observation.entity.js';
import { DevelopmentPart } from './development-part.entity.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'development',
})
export class Development {
  @PrimaryGeneratedColumn('uuid', {
    name: 'development_id',
  })
  developmentId: string;

  @Column({
    name: 'development_key',
    type: 'text',
    unique: true,
  })
  developmentKey: string;

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
    name: 'planning_application',
    type: 'text',
    nullable: true,
  })
  planningApplication: string | null;

  @Column({
    type: 'double precision',
    nullable: true,
  })
  longitude: number | null;

  @Column({
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

  @OneToMany(
    () => DevelopmentObservation,
    (observation) => observation.development,
  )
  observations: DevelopmentObservation[];

  @OneToMany(() => DevelopmentPart, (part) => part.development)
  parts: DevelopmentPart[];

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
}
