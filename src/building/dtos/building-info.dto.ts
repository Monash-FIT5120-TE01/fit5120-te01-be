import { PropertyDetails } from '../entities/building-info-view.entity.js';

export interface BuildingInfoResponseDto {
  buildingId: string;
  height: number;
  details: PropertyDetails | {};
}
