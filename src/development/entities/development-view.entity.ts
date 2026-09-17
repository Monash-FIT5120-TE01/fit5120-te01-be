import { ViewColumn, ViewEntity } from 'typeorm';

export interface DevelopmentLandUse {
  use_type: string;
  quantity: number;
  unit: string;
}

@ViewEntity({
  schema: 'digital_twin_v2',
  name: 'v_development_activity_model_info',
})
export class DevelopmentActivityModelInfoView {
  @ViewColumn()
  development_id: string;

  @ViewColumn()
  development_key: string;

  @ViewColumn()
  street_address: string | null;

  @ViewColumn()
  planning_application: string | null;

  @ViewColumn()
  longitude: number | null;

  @ViewColumn()
  latitude: number | null;

  @ViewColumn()
  location: string | null;

  @ViewColumn()
  observed_at: Date | null;

  @ViewColumn()
  status: string;

  @ViewColumn()
  floors_above: number | null;

  @ViewColumn()
  residential_units: number | null;

  @ViewColumn()
  office_floor_area_m2: number | null;

  @ViewColumn()
  retail_floor_area_m2: number | null;

  @ViewColumn()
  industrial_floor_area_m2: number | null;

  @ViewColumn()
  education_floor_area_m2: number | null;

  @ViewColumn()
  total_floor_area_m2: number | null;

  @ViewColumn()
  car_spaces: number | null;

  @ViewColumn()
  bike_spaces: number | null;

  @ViewColumn()
  development_part_id: string;

  @ViewColumn()
  permit_number: string | null;

  @ViewColumn()
  model_status: string | null;

  @ViewColumn()
  shape_type: string | null;

  @ViewColumn()
  model_num_floors: number | null;

  @ViewColumn()
  base_ahd_m: number | null;

  @ViewColumn()
  top_ahd_m: number | null;

  @ViewColumn()
  approx_height_m: number | null;

  @ViewColumn()
  model_date: Date | null;

  @ViewColumn()
  component_count: number | null;

  @ViewColumn()
  footprint_area_m2: number | null;

  @ViewColumn()
  land_uses: DevelopmentLandUse[];

  @ViewColumn()
  geometry: object;
}
