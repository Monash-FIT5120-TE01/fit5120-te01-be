import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'digital_twin_v2', name: 'cbd_landmarks_address_qa' })
export class LandmarkInfo {
  @PrimaryColumn({
    name: 'source_row',
    type: 'integer',
  })
  sourceRow: number;

  @Column({
    name: 'landmark_name',
    type: 'varchar',
    length: 255,
  })
  landmarkName: string;

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 11,
    scale: 8,
  })
  longitude: string;

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 11,
    scale: 8,
  })
  latitude: string;

  @Column({
    name: 'theme',
    type: 'varchar',
    length: 100,
  })
  theme: string;

  @Column({
    name: 'sub_theme',
    type: 'varchar',
    length: 100,
  })
  subTheme: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    name: 'match_status',
    type: 'varchar',
    length: 50,
  })
  matchStatus: string;

  @Column({
    name: 'address_source',
    type: 'text',
  })
  addressSource: string;

  @Column({
    name: 'match_distance_m',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  matchDistanceM: string | null;

  @Column({
    name: 'site_status',
    type: 'varchar',
    length: 50,
  })
  siteStatus: string;

  @Column({
    name: 'address_type',
    type: 'varchar',
    length: 50,
  })
  addressType: string;

  @Column({
    name: 'review_note',
    type: 'text',
    nullable: true,
  })
  reviewNote: string | null;
}
