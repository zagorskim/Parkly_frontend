import Box from '@mui/material/Box';
import { UserLogged } from '../data/AppModeData';
import { UserData } from "./../data/UserData";
import { useRecoilState } from "recoil";
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
  ValidateNumericLoan,
  ValidateLetters,
  ValidateEmail,
  ValidateDates,
  ValidatePassword,
} from "../data/HelperFunctions";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { CircularProgress, Fade, Stack } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Person2Icon from "@mui/icons-material/Person2";
import TextareaAutosize from '@mui/base/TextareaAutosize';

export const UserForm: React.FC = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('01/01/2023')
    const [endDate, setEndDate] = useState('01/02/2023')
    const [description, setDescription] = useState('');
    const [parkingLot, setParkingLot] = useState({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage("");
        setLoading(true);
        event.preventDefault();
       
        // POST reservation

      };

    return (
        <Box>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
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
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Person2Icon sx={{ alignSelf: "center", height: "60px", width: "60px" }} />
                    <Typography sx={{ alignSelf: "center" }} component="h1" variant="h5">
                      Fill personal information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid width="100%" item marginBottom={1}></Grid>
                      <Grid item xs={12}>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          id="jobType"
                          options={[]}
                          renderInput={(params) => <TextField {...params} label="Parking Lot" />}
                          value={parkingLot}
                          onChange={(event, value) => {
                            setParkingLot({});
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DesktopDatePicker
                          label="Reservation start date"
                          inputFormat="dd/MM/yyyy HH:mm:ss"
                          value={startDate}
                          onChange={(x: any) => setStartDate(x)}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              error={ValidateDates(startDate, endDate)}
                              helperText={
                                ValidateDates(startDate, endDate) &&
                                "Job starts later than ends"
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DesktopDatePicker
                          label="Job end date"
                          inputFormat="MM/DD/YYYY"
                          value={endDate}
                          onChange={(x: any) => setEndDate(x)}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              error={ValidateDates(startDate, endDate)}
                              helperText={
                                ValidateDates(startDate, endDate) &&
                                "Job ends earlier than starts"
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <TextareaAutosize/>
                      </Grid>
                    </Grid>
                  </Box>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
                <Box mt={3} sx={{ height: 40 }}></Box>
                <Grid spacing={1} container>
                  <Grid width="100%" item></Grid>
                  <Grid width="100%" item></Grid>
                </Grid>
              </Box>
          </Box>
          <Fade in={loading} unmountOnExit>
            <CircularProgress sx={{ marginBottom: 20 }} />
          </Fade>
        </Container>
      </Box>
    )
} 