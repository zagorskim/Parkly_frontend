export interface ParkingLotDetails {
  id: number;
  name: string;
  capacity: number;
  slots_available: number;
  description: string;
  latitude: number;
  longitude: number;
  pricePerDay: number;
  parkingLotType: string;
  security: boolean;
  photo: string;
}

export enum ParkingLotTypes {
  Normal,
  Covered,
  Underground,
}
