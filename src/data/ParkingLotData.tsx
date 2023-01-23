import { atom, selector } from 'recoil';
import { ParkingLotDetails } from './ParkingLotTypes';

export const ParkingLotInquiry = atom({
    key: 'ReservationInquiry',
    default: [
		{id: 1, address: "Marszałkowska 1", slots_total: 200, slots_available: 50, description: "oweijofiwe", latitude: 52.432, longitude: 21.123, price_per_day: 30, type: "Wielopoziomowy", security: true},
		{id: 2, address: "Nowowiejska 5", slots_total: 50, slots_available: 13, description: "epodfkgdf", latitude: 52.233, longitude: 21.789, price_per_day: 20, type: "Podziemny", security: false}
	] as ParkingLotDetails[]
})
