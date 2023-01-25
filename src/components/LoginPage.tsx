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
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { UserLogged, UserToken } from '../data/AppModeData';
import axios from "axios";
import { AUTHENTICATION_ENDPOINT_ADDRESS } from "../ConnectionVariables";

export const LoginPage: React.FC = () => {
  const [userLogged, setUserLogged] = useRecoilState(UserLogged);
  const [token, setToken] = useRecoilState(UserToken);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.post(AUTHENTICATION_ENDPOINT_ADDRESS, {
      username: data.get("username"),
      password: data.get("password"),
    }).then((res) => {
        console.log(res);
        setToken(res.data);
        navigate('/home');
        setUserLogged("simple");
        localStorage.setItem('token', res.data);
    }).catch((res) => {
        console.log(res);
    });
    // TBD: REST POST AND USER DETAILS GET TO BE IMPLEMENTED, SETTING USER DETAILS TO STATE
    // temporarily hard-coded user
    // TBD: SUCCESSFUL LOGIN REDIRECTION, CONDITION FOR AFFIRMATIVE BACKEND ANSWER TO BE ADDED
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
          />
          {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid spacing={1} container>
            {/* <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid> */}
            {/* <Grid width='100%' item>
                        <Link href="register" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
