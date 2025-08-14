export enum VehicleCategory {
  LAND = 'Land Vehicle',
  WATER = 'Water Vehicle',
  AIR = 'Air Vehicle',
}

export interface Vehicle {
  name: string;
  category: VehicleCategory;
  img: string;
  url: string;
  capacity?: number;
  speed?: string;
} 