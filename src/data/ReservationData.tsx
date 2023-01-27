import { atom, selector } from 'recoil';
import { ReservationDetails } from './ReservationTypes';

export const ReservationInquiry = atom({
    key: 'ReservationInquiry',
    default: [
		{id: 1, user_id: 1, user_first_name: "John", user_last_name: "Smith", parking_lot_id: 1, parking_lot_address: "Marszałkowska 1", description: "asdf", start_date: new Date(2023, 0, 1), end_date: new Date(2023, 0, 14)},
		{id: 2, user_id: 2, user_first_name: "Michael", user_last_name: "Jackson", parking_lot_id: 2, parking_lot_address: "Nowowiejska 5", description: "ghjk", start_date: new Date(2023, 0, 14), end_date: new Date(2023, 1, 2)},
		{id: 2, user_id: 2, user_first_name: "Michael", user_last_name: "Jackson", parking_lot_id: 2, parking_lot_address: "Nowowiejska 5", description: "ghjk", start_date: new Date(2023, 0, 14), end_date: new Date(2023, 1, 2)},
		{id: 2, user_id: 2, user_first_name: "Michael", user_last_name: "Jackson", parking_lot_id: 2, parking_lot_address: "Nowowiejska 5", description: "ghjk", start_date: new Date(2023, 0, 14), end_date: new Date(2023, 1, 2)},
		{id: 2, user_id: 2, user_first_name: "Michael", user_last_name: "Jackson", parking_lot_id: 2, parking_lot_address: "Nowowiejska 5", description: "ghjk", start_date: new Date(2023, 0, 14), end_date: new Date(2023, 1, 2)}
	] as ReservationDetails[]
})

export const ReservationFormMode = atom({
	key: 'ReservationFormMode',
	default: {
		mode: 'create',
		data: {} as ReservationDetails,
	}
})
