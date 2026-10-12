import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PedestrianCountSensor } from './pedestrian-count-sensor.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'pedestrian_counts' })
export class PedestrianCount {
  @PrimaryColumn({
    name: 'location_id',
    type: 'integer',
  })
  locationId: number;

  @PrimaryColumn({
    name: 'timestamp',
    type: 'timestamptz',
  })
  timestamp: Date;

  @Column({
    name: 'count',
    type: 'numeric',
    precision: 10,
    scale: 1,
    nullable: true,
  })
  count: string | null;

  @ManyToOne(
    () => PedestrianCountSensor,
    (pedCountSensor) => pedCountSensor.pedCounts,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'location_id' })
  pedCountSensor: Awaited<PedestrianCountSensor>;
}
