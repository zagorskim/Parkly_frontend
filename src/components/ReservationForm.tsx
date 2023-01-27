import Box from "@mui/material/Box";
import { UserData } from "./../data/UserData";
import { useRecoilState, useRecoilStoreID } from "recoil";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import {
  ValidateNumeric,
  ValidateNumericFloat,
  ValidateLetters,
  ValidateEmail,
  ValidateDates,
  ValidatePassword,
} from "../data/HelperFunctions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { CircularProgress, Fade, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Person2Icon from "@mui/icons-material/Person2";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { width } from "@mui/system";
import { ReservationFormMode } from "../data/ReservationData";
import { ParkingLotInquiry } from "../data/ParkingLotData";
import { ParkingLotDetails } from "../data/ParkingLotTypes";
import { PUT_RESERVATION_ENDPOINT_ADDRESS } from "../ConnectionVariables";

export const ReservationForm: React.FC = () => {
  const [modeData, setModeData] = useRecoilState(ReservationFormMode);
  const [parkingLots, setParkingLots] = useRecoilState(ParkingLotInquiry);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    modeData.mode == "create"
      ? "01/01/2023"
      : modeData.data.start_date.getDay().toString() +
          "/" +
          modeData.data.start_date.getMonth().toString() +
          modeData.data.start_date.getFullYear().toString()
  );
  const [endDate, setEndDate] = useState(
    modeData.mode == "create"
      ? "01/02/2023"
      : modeData.data.end_date.getDay().toString() +
          "/" +
          modeData.data.end_date.getMonth().toString() +
          modeData.data.end_date.getFullYear().toString()
  );
  const [description, setDescription] = useState(
    modeData.mode == "create" ? "" : modeData.data.description
  );
  const [parkingLot, setParkingLot] = useState(
    modeData.mode == "create"
      ? ({} as ParkingLotDetails)
      : parkingLots[modeData.data.parking_lot_id]
  );
  const [userId, setUserId] = useState(modeData.mode == "create" ? "" : modeData.data.id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    setLoading(true);
    event.preventDefault();
    if (modeData.mode == "create") {
      const config = {
        headers: { Authorization: `Bearer ${userLogged.token}` },
      };
      const start = new Date(startDate);
      console.log(start.getUTCMonth())
      const end = new Date(endDate);
      axios
        .put(
          PUT_RESERVATION_ENDPOINT_ADDRESS,
          {
            reservationId: -1,
            description: description,
            userId: Number.parseInt(userId as string),
            parkingId: parkingLot.id,
            startDate: start.getFullYear().toString() + '-' + ((start.getUTCMonth() + 1) < 10 ? '0' + (start.getUTCMonth() + 1).toString() : start.getUTCMonth() + 1).toString() + '-' + start.getUTCDate().toString(),
            endDate:  end.getFullYear().toString() + '-' + ((end.getUTCMonth() + 1) < 10 ? '0' + (end.getUTCMonth() + 1).toString() : end.getUTCMonth() + 1).toString() + '-' + end.getUTCDate().toString(),
          },
          config
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((res) => {
          console.log(res);
          setErrorMessage("Error occured during creating reservation");
          setLoading(false);
        });
    } else {
      // UPDATE reservation
    }
  };

  return (
    <Box>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" mb={3} style={{ fontWeight: 3 }} color="error">
            {errorMessage}
          </Typography>
          <LibraryBooksIcon sx={{ marginBottom: "20px", height: "60px", width: "60px" }} />
          <Typography component="h1" variant="h5">
            Enter reservation details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid width="100%" item marginBottom={1}></Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="jobType"
                  options={parkingLots.map((x, index) => {
                    return x.address;
                  })}
                  renderInput={(params) => <TextField {...params} label="Parking Lot" />}
                  value={parkingLot.address != undefined ? parkingLots[parkingLot.id].address : ''}
                  onChange={(event, value) => {
                    setParkingLot(parkingLots.find((x) => {return x.address == value;}) as ParkingLotDetails);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="userId"
                  required
                  fullWidth
                  id="userId"
                  label="UserID"
                  autoFocus
                  value={userId}
                  onChange={(x) => setUserId(x.target.value)}
                  error={!ValidateNumeric(userId as string)}
                  helperText={!ValidateNumeric(userId as string) && "Only numbers allowed"}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  label="Reservation start date"
                  inputFormat="DD/MM/YYYY HH:mm"
                  value={startDate}
                  onChange={(x: any) => setStartDate(x)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      error={ValidateDates(startDate, endDate)}
                      helperText={ValidateDates(startDate, endDate) && "Job starts later than ends"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  label="Reservation end date"
                  inputFormat="DD/MM/YYYY HH:mm"
                  value={endDate}
                  onChange={(x: any) => setEndDate(x)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      error={ValidateDates(startDate, endDate)}
                      helperText={
                        ValidateDates(startDate, endDate) && "Job ends earlier than starts"
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  value={description}
                  onChange={(x) => setDescription(x.target.value)}
                  placeholder="Description"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {modeData.mode == "create" && "Submit"}
              {modeData.mode != "create" && "Update"}
            </Button>
            <Box mt={3} sx={{ height: 40 }}></Box>
            <Grid spacing={1} container>
              <Grid width="100%" item></Grid>
              <Grid width="100%" item></Grid>
            </Grid>
          </Box>
          <Fade in={loading} unmountOnExit>
            <CircularProgress sx={{ marginBottom: 20 }} />
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};
