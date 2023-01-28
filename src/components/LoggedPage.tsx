import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { ReservationList } from "./ReservationList";
import { UserData } from "./../data/UserData";
import Container from "@mui/material/Container";
import { Typography, Stack } from "@mui/material";
import { AllReservations } from "../data/ReservationData";
import { AllParkingLots } from "../data/ParkingLotData";

export const LoggedPage: React.FC = () => {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [reservations, setReservations] = useRecoilState(AllReservations);
  const [parkingLots, setParkingLots] = useRecoilState(AllParkingLots);

  let totalParkingSlots = 0;
  parkingLots.forEach((value, index) => (totalParkingSlots += value.capacity));

  return (
    <Box display="flex" justifyContent="center">
      <Stack mt={10}>
        <Typography alignSelf="center" variant="h4">
          General info
        </Typography>
        <Typography mt={4} variant="h5">
          {"Amount of registered parking lots: " + parkingLots.length}
        </Typography>
        <Typography mt={4} variant="h5">
          {"Amount of current reservations: " + reservations.length}
        </Typography>
        <Typography mt={4} variant="h5">
          {"Total number of parking slots: " + totalParkingSlots}
        </Typography>
      </Stack>
    </Box>
  );
};
