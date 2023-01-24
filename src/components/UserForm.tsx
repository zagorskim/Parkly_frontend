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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { CircularProgress, Fade, Stack } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Person2Icon from "@mui/icons-material/Person2";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export const UserForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
          <Person2Icon sx={{ alignSelf: "center", height: "60px", width: "60px" }} />
          <Typography sx={{ alignSelf: "center" }} component="h1" variant="h5">
            Fill personal information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(x) => setFirstName(x.target.value)}
                  error={!ValidateLetters(firstName)}
                  helperText={
                    !ValidateLetters(firstName) &&
                    "Only letter allowed, must start with uppercase letter"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(x) => setLastName(x.target.value)}
                  error={!ValidateLetters(lastName)}
                  helperText={
                    !ValidateLetters(lastName) &&
                    "Only letter allowed, must start with uppercase letter"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(x) => setEmail(x.target.value)}
                  error={!ValidateEmail(email)}
                  helperText={!ValidateEmail(email) && "Wrong email format"}
                />
              </Grid>
            </Grid>
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
          <Box mt={3} sx={{ height: 40 }}></Box>
            <Fade in={loading} unmountOnExit>
              <CircularProgress sx={{ marginBottom: 20 }} />
            </Fade>
        </Box>
      </Container>
    </Box>
  );
};
