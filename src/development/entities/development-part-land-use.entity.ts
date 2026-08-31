import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DevelopmentPart } from './development-part.entity.js';

@Entity({
  schema: 'digital_twin_v2',
  name: 'development_part_land_use',
})
export class DevelopmentPartLandUse {
  @PrimaryColumn({
    name: 'development_part_id',
    type: 'text',
  })
  developmentPartId: string;

  @PrimaryColumn({
    name: 'sequence_no',
    type: 'smallint',
  })
  sequenceNo: number;

  @ManyToOne(() => DevelopmentPart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'development_part_id',
  })
  developmentPart: Awaited<DevelopmentPart>;

  @Column({
    name: 'use_type',
    type: 'text',
    nullable: true,
  })
  useType: string | null;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  quantity: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  unit: string | null;

  @Column({
    name: 'raw_value',
    type: 'text',
    nullable: true,
  })
  rawValue: string | null;
}
