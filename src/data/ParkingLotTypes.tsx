export interface ParkingLotDetails {
	id: number,
	address: string,
	slots_total: number,
	slots_available: number,
	description: string,
	latitude: number,
	longitude: number,
	price_per_day: number,
	type: string,
	security: boolean,
	photo: string,
}

export enum ParkingLotTypes {
	Normal,
	Covered,
	Underground,
}
