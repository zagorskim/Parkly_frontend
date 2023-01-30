import { atom } from "recoil";
import { ParkingLotDetails } from "./ParkingLotTypes";

export const ParkingLotInquiry = atom({
  key: "ParkingLotInquiry",
  default: [] as ParkingLotDetails[],
});

export const ParkingLotFormMode = atom({
  key: "ParkingLotFormMode",
  default: {
    mode: "create",
    data: {} as ParkingLotDetails,
  },
});

export const AllParkingLots = atom({
  key: "AllParkingLots",
  default: [] as ParkingLotDetails[],
});

export const RefreshParkingLots = atom({
  key: "RefreshParkingLots",
  default: false,
});
