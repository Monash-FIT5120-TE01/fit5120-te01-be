import { MultiPolygonGeometry } from '../../shared/interfaces/MultiPolygonGeometry.js';
import { DevelopmentLandUse } from '../entities/development-view.entity.js';

export interface DevFootprintResponseDto {
  type: string;
  name: string;
  features: DevFootprintFeature[];
}

export interface DevFootprintFeature {
  type: string;
  id: string;
  geometry: MultiPolygonGeometry;
  properties: DevFootprintProperties;
}

export interface DevFootprintProperties {
  devId: string;
  devKey: string;
  streetAddress: number;
  longitude: number;
  latitude: number;
  status: string;
  modelStatus: string;
  shapeType: string;
  baseAhdM: number;
  topAhdM: number;
  approxHeightM: number;
  componentCount: number;
  footprintAreaM2: number;
  landUses: DevelopmentLandUse[];
}
