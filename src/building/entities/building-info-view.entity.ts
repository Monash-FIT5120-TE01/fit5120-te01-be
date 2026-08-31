import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  schema: 'digital_twin_v2',
  name: 'v_existing_building_info',
})
export class ExistingBuildingInfoView {
  @ViewColumn()
  building_id: string;

  @ViewColumn()
  structure_id: string;

  @ViewColumn()
  capture_date: Date;

  @ViewColumn()
  structure_min_elevation_ahd_m: number;

  @ViewColumn()
  structure_max_elevation_ahd_m: number;

  @ViewColumn()
  structure_height_m: number;

  @ViewColumn()
  building_import_id: number;

  @ViewColumn()
  linked_property_count: number;

  @ViewColumn()
  properties_details: PropertyDetails[];
}

export interface PropertyDetails {
  property_id: string;
  base_property_id: string | null;
  block_id: string | null;
  census_year: number | null;
  building_name: string | null;
  street_address: string | null;
  construction_year: number | null;
  refurbished_year: number | null;
  floors_above_ground: number | null;
  predominant_space_use: string | null;
  accessibility_rating: string | null;
  bicycle_spaces: number | null;
  longitude: number | null;
  latitude: number | null;
}
