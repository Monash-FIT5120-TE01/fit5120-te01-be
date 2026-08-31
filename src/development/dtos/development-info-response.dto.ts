import { DevelopmentLandUse } from '../entities/development-view.entity.js';

export interface DevInfoResponseDto {
  developmentId: string;
  developmentKey: string | null;
  streetAddress: string | null;
  planningApplication: string | null;
  permitNumber: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string | null;
  modelStatus: string | null;
  floorsAbove: number | null;
  residentialUnits: number | null;
  officeFloorAreaM2: number | null;
  retailFloorAreaM2: number | null;
  industrialFloorAreaM2: number | null;
  educationFloorAreaM2: number | null;
  carSpaces: number | null;
  bikeSpaces: number | null;
  landUses: DevelopmentLandUse[] | null;
}
