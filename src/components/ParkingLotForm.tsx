import Box from "@mui/material/Box";
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
import { CircularProgress, Fade, FormControlLabel, Stack } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { ParkingLotDetails, ParkingLotTypes } from "../data/ParkingLotTypes";
import { ParkingLotFormMode } from "../data/ParkingLotData";
import { Checkbox } from "@mui/material";
import { PUT_PARKING_ENDPOINT_ADDRESS } from "../ConnectionVariables";
import { width } from "@mui/system";

export const ParkingLotForm: React.FC = () => {
  const [modeData, setModeData] = useRecoilState(ParkingLotFormMode);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(
    modeData.mode == "create" ? "" : modeData.data.latitude
  );
  const [longitude, setLongitude] = useState(
    modeData.mode == "create" ? "" : modeData.data.longitude
  );
  const [description, setDescription] = useState(
    modeData.mode == "create" ? "" : modeData.data.description
  );
  const [pricePerDay, setPricePerDay] = useState(
    modeData.mode == "create" ? "" : modeData.data.price_per_day
  );
  const [parkingLotType, setParkingLotType] = useState(
    modeData.mode == "create" ? Object.values(ParkingLotTypes)[0].toString() : modeData.data.type
  );
  const [parkingPhoto, setParkingPhoto] = useState(
    "sgfd"
    //modeData.mode == "create" ? ({} as File) : ({ name: "previousPhoto.extention" } as File)
  );
  const [parkingLotName, setParkingLotName] = useState(
    modeData.mode == "create" ? "" : modeData.data.address
  );
  const [capacity, setCapacity] = useState(
    modeData.mode == "create" ? "" : modeData.data.slots_total
  );
  const [security, setSecurity] = useState(modeData.mode == "create" ? "" : modeData.data.security);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    setLoading(true);
    event.preventDefault();
    if (modeData.mode == "create") {
      const config = {
        headers: { Authorization: `Bearer ${userLogged.token}` },
      };
      axios
        .put(
          PUT_PARKING_ENDPOINT_ADDRESS,
          {
            id: -1,
            security: security,
            name: parkingLotName,
            capacity: Number.parseFloat(capacity as string),
            description: description,
            latitude: Number.parseFloat(latitude as string),
            longitude: Number.parseFloat(longitude as string),
            pricePerDay: pricePerDay,
            type: parkingLotType,
            photo: parkingPhoto,
          },
          config
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((res) => {
          console.log(res);
          setErrorMessage("Error occured during adding parking lot");
          setLoading(false);
        });
    } else {
      // UPDATE parking lot
    }
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
          <Typography align="center" variant="h5" mb={3} color="error">
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
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="parkingType"
                  options={Object.keys(ParkingLotTypes).filter((k) => isNaN(Number(k)))}
                  renderInput={(params) => <TextField {...params} label="Parking Type" />}
                  value={parkingLotType}
                  onChange={(event, value) => {
                    setParkingLotType(value as string);
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
                  onChange={(x) => setPricePerDay(x.target.value)}
                  error={!ValidateNumericFloat(pricePerDay.toString())}
                  helperText={
                    !ValidateNumericFloat(pricePerDay.toString()) &&
                    "Only numeric values separated with '.' (NNNN.NNNN)"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="capacity"
                  label="Capacity"
                  name="capacity"
                  value={capacity}
                  autoFocus
                  onChange={(x) => setCapacity(x.target.value)}
                  error={!ValidateNumeric(capacity.toString())}
                  helperText={!ValidateNumeric(capacity.toString()) && "Only numeric values"}
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
                  error={!ValidateNumericFloat(latitude.toString())}
                  helperText={
                    !ValidateNumericFloat(latitude.toString()) &&
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
                  error={!ValidateNumericFloat(longitude.toString())}
                  helperText={
                    !ValidateNumericFloat(longitude.toString()) &&
                    "Only numeric values separated with dot '.' (NNNN.NNNN)"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Security"
                  control={
                    <Checkbox
                      checked={security as boolean}
                      onChange={(x) => setSecurity(x.target.checked)}
                    />
                  }
                ></FormControlLabel>
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
                  Upload Image
                  <input
                    accept="image/*"
                    onChange={(x) => {
                      if (x.target.files != null) setParkingPhoto(x.target.files[0].name);
                    }}
                    type="file"
                    hidden
                  />
                </Button>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {modeData.mode == "create" && "Submit"}
              {modeData.mode != "create" && "Update"}
            </Button>
            <Box mt={3} sx={{ height: 40 }} />
          </Box>
        </Box>
      </Container>
      <Stack>
        <Fade style={{ alignSelf: "center", justifySelf: "center" }} in={loading} unmountOnExit>
          <CircularProgress sx={{ alignSelf: "center", marginBottom: 20 }} />
        </Fade>
      </Stack>
    </Box>
  );
};
