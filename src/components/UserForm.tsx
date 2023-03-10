import Box from "@mui/material/Box";
import { UserData } from "./../data/UserData";
import { useRecoilState } from "recoil";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import {
  ValidateEmail,
  ValidatePassword,
} from "../data/ValidationFunctions";
import { CircularProgress, Fade } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { ValidateLettersAndNumbers } from "../data/ValidationFunctions";
import { CREATE_USER_ENDPOINT_ADDRESS } from "../ConnectionVariables";

export const UserForm: React.FC = () => {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    setLoading(true);
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .put(
        CREATE_USER_ENDPOINT_ADDRESS,
        {
          id: Math.floor(Math.random() * 10000),
          username: userName,
          password: password,
          email: email,
          userType: "BASIC",
        },
        config
      )
      .then((res) => {
        setErrorMessage("User created successfully!");
        setLoading(false);
      })
      .catch((res) => {
        setErrorMessage("Error occured during user creation");
        setLoading(false);
      });
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
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                  value={userName}
                  onChange={(x) => setUserName(x.target.value)}
                  error={!ValidateLettersAndNumbers(userName)}
                  helperText={
                    !ValidateLettersAndNumbers(userName) &&
                    "Only letter allowed, must start with uppercase letter"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="family-name"
                  value={email}
                  onChange={(x) => setEmail(x.target.value)}
                  error={!ValidateEmail(email)}
                  helperText={!ValidateEmail(email) && "Wrong email format"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={(x) => setPassword(x.target.value)}
                  error={!ValidatePassword(password)}
                  helperText={
                    !ValidatePassword(password) &&
                    "Password too weak (must be at least 8-character long and contain one lower case letter, one upper case letter, one number and one special character)"
                  }
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
