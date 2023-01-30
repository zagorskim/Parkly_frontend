import { atom } from "recoil";
import { UserDetails } from "./Types";

export const UserData = atom({
  key: "UserData",
  default: {} as UserDetails,
});

export const TokenRefreshed = atom({
  key: "TokenRefreshed",
  default: false,
});

export const LoggedFlag = atom({
  key: "LoggedFlag",
  default: false,
});
