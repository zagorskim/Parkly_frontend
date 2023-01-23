import Box from "@mui/material/Box";
import { UserLogged } from "../data/AppModeData";
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
  ValidateNumericFloat,
  ValidateLetters,
  ValidateEmail,
  ValidateDates,
  ValidatePassword,
} from "../data/HelperFunctions";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import { CircularProgress, Fade, Stack } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export const ParkingLotForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState(0);
  const [parkingLotType, setParkingLotType] = useState({});
  const [parkingPhoto, setParkingPhoto] = useState({});
    const [parkingLotName, setParkingLotName] = useState('');

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
          <LocalParkingIcon sx={{ marginBottom: "20px", height: "60px", width: "60px" }} />
          <Typography component="h1" variant="h5">
            Fill parking lot details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid width="100%" item marginBottom={1}></Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="parkingLotName"
                  required
                  fullWidth
                  id="parkingLotName"
                  label="Parking Lot Name"
                  autoFocus
                  value={parkingLotName}
                  onChange={(x) => setParkingLotName(x.target.value)}
                  error={!ValidateLetters(parkingLotName)}
                  helperText={
                    !ValidateLetters(parkingLotName) &&
                    "Only letter allowed, must start with uppercase letter"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="parkingType"
                  options={[]}
                  renderInput={(params) => <TextField {...params} label="Parking Type" />}
                  value={parkingLotType}
                  onChange={(event, value) => {
                    setParkingLotType({});
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pricePerDay"
                  label="Price per day"
                  name="pricePerDay"
                  value={pricePerDay}
                  autoFocus
                  onChange={(x) => setPricePerDay(Number.parseFloat(x.target.value))}
                  error={!ValidateNumericFloat(pricePerDay.toString())}
                  helperText={
                    !ValidateNumericFloat(pricePerDay.toString()) &&
                    "Only numeric values separated with '.' (NNNN.NNNN)"
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="latitude"
                  label="Latitude"
                  name="latitude"
                  value={latitude}
                  autoFocus
                  onChange={(x) => setLatitude(x.target.value)}
                  error={!ValidateNumericFloat(latitude)}
                  helperText={
                    !ValidateNumericFloat(latitude) &&
                    "Only numeric values separated with '.' (NNNN.NNNN)"
                  }
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  value={longitude}
                  autoFocus
                  onChange={(x) => setLongitude(x.target.value)}
                  error={!ValidateNumericFloat(longitude)}
                  helperText={
                    !ValidateNumericFloat(longitude) &&
                    "Only numeric values separated with dot '.' (NNNN.NNNN)"
                  }
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
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" component="label">
                  Upload File
                  <input accept="image/*" onChange={(x) =>{ if(x.target.files != null) setParkingPhoto(x.target.files[0]);}} type="file" hidden />
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Box mt={3} sx={{ height: 40 }}></Box>
        </Box>
        <Fade in={loading} unmountOnExit>
          <CircularProgress sx={{ marginBottom: 20 }} />
        </Fade>
      </Container>
    </Box>
  );
};
