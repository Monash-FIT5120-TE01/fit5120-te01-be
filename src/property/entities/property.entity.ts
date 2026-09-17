import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyObservation } from './property-observation.entity.js';
import { PropertyBuildingLink } from './property-building-link.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'property' })
export class Property {
  @PrimaryColumn({
    name: 'property_id',
    type: 'text',
  })
  propertyId: string;

  @Column({
    name: 'base_property_id',
    type: 'text',
    nullable: true,
  })
  basePropertyId: string | null;

  @Column({
    name: 'block_id',
    type: 'text',
    nullable: true,
  })
  blockId: string | null;

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

  @OneToMany(() => PropertyObservation, (observation) => observation.property)
  observations: PropertyObservation[];

  @OneToMany(() => PropertyBuildingLink, (link) => link.property)
  buildingLinks: PropertyBuildingLink[];
}
