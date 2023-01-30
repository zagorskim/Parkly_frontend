import { atom } from "recoil";
import { ReservationDetails } from "./ReservationTypes";

export const ReservationInquiry = atom({
  key: "ReservationInquiry",
  default: [] as ReservationDetails[],
});

export const ReservationFormMode = atom({
  key: "ReservationFormMode",
  default: {
    mode: "create",
    data: {} as ReservationDetails,
  },
});

export const AllReservations = atom({
  key: "AllReservations",
  default: [] as ReservationDetails[],
});

export const RefreshReservations = atom({
  key: "RefreshReservations",
  default: false,
});
