import { MultiPolygonGeometry } from '../../shared/interfaces/MultiPolygonGeometry.js';

export interface BuildingFootprintResponseDto {
  type: string;
  name: string;
  features: BuildingFootprintFeature[];
}

export interface BuildingFootprintFeature {
  type: string;
  id: string;
  objectId: string;
  geometry: MultiPolygonGeometry;
  properties: BuildingFootprintProperties;
}

export interface BuildingFootprintProperties {
  buildingId: string;
  structureId: string;
  componentCount: number;
  structureMinElevationAhdM: number;
  structureMaxElevationAhdM: number;
  structureHeightM: number;
  footprintType: string;
  roofType: string;
  footprintMinElevationAhdM: number;
  footprintMaxElevationAhdM: number;
  footprintExtrusionM: number;
  calculatedExtrusionM: number;
  relativeBaseHeightM: number;
  relativeTopHeightM: number;
  footprintAreaM2: number;
}
