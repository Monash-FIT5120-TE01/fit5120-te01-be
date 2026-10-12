import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PedestrianCount } from './pedestrian-count.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'pedestrian_count_sensor' })
export class PedestrianCountSensor {
  @PrimaryColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'lat',
    type: 'double precision',
  })
  lat: number;

  @Column({
    name: 'lon',
    type: 'double precision',
  })
  lon: number;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
  })
  status: string;

  @OneToMany(() => PedestrianCount, (pedCount) => pedCount.pedCountSensor)
  pedCounts: Awaited<PedestrianCount[]>;
}
