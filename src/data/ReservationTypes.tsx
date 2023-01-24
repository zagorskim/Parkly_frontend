export interface ReservationDetails {
	id: number,
	user_id: number,
	user_first_name: string,
	user_last_name: string,
	parking_lot_address: string,
	parking_lot_id: number,
	description: string,
	start_date: Date,
	end_date: Date
}
