import { PropertyDetails } from '../entities/building-info-view.entity.js';

export interface BuildingInfoResponseDto {
  buildingId: string;
  height: number;
  details: PropertyDetails | {};
}

export interface LandmarkInfoResponseDto {
  landmark_name: string;
  longitude: number;
  latitude: number;
  address: string;
}
