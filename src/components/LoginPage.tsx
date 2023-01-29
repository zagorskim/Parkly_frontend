import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/LoginOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import axios from "axios";
import {
  AUTHENTICATION_ENDPOINT_ADDRESS,
  FETCH_USER_DATA_ENDPOINT_ADDRESS,
} from "../ConnectionVariables";
import { useState } from "react";
import { ValidateLettersAndNumbers, ValidatePassword } from "../data/ValidationFunctions";
import { UserData } from "./../data/UserData";
import { UserDetails } from "../data/Types";

export const LoginPage: React.FC = () => {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(AUTHENTICATION_ENDPOINT_ADDRESS, {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        console.log(res);
        const token = res.data.jwttoken;
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios
          .get(FETCH_USER_DATA_ENDPOINT_ADDRESS, config)
          .then((res) => {
            console.log(res);
            setUserLogged({
              token: token,
              accountType: res.data.userType,
              username: res.data.username,
              email: res.data.email,
            } as UserDetails);
            sessionStorage.setItem("token", token);
            navigate("/home");
          })
          .catch((res) => {
            console.log(res);
            setErrorMessage("Error occured during fetching user data");
          });
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage("Wrong credentials");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={3} style={{ fontWeight: 3 }} color="error">
          {errorMessage}
        </Typography>
        <LoginIcon sx={{ marginBottom: "20px", height: "60px", width: "60px" }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={userName}
            onChange={(x) => setUserName(x.target.value)}
            error={!ValidateLettersAndNumbers(userName)}
            helperText={!ValidateLettersAndNumbers(userName) && "Only letters and numbers allowed"}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(x) => setPassword(x.target.value)}
            error={!ValidatePassword(password)}
            helperText={
              !ValidatePassword(password) &&
              "Password too weak (must be at least 8-character long and contain one lower case letter, one upper case letter, one number and one special character)"
            }
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid spacing={1} container></Grid>
        </Box>
      </Box>
      <Outlet/>
    </Container>
  );
};
