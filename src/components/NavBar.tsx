import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AppIcon from "@mui/icons-material/DirectionsCarFilled";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import Divider from "@mui/material/Divider";
import { width } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../data/UserData";
import { UserDetails } from '../data/Types';
import { Stack } from '@mui/material';

const pages1 = ["RESERVATIONS", "PARKING LOTS", "ADD RESERVATION", "ADD PARKING LOT"];
const pages2 = ["RESERVATIONS", "PARKING LOTS", "ADD RESERVATION", "ADD PARKING LOT", "ADD USER"];
const pages3 = [] as string[];

const settings1 = ["Profile", "Logout"];

// MUI template navigation bar
export const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const reservationsHandler = () => {
    navigate("/home/reservations");
  };

  const parkingLotsHandler = () => {
    navigate("/home/parkinglots");
  };

  const addReservationHandler = () => {
    navigate("/home/addreservation");
  };

  const addParkingLotHandler = () => {
    navigate("/home/addparkinglot");
  };

  const addUserHandler = () => {
    navigate("/home/adduser");
  };

  useEffect(() => {
  }, [userLogged])

  const logoutHandler = () => {
      sessionStorage.removeItem("token");
      navigate("/");
      setUserLogged({} as UserDetails);
  };

  let pages = [];
  if(userLogged.accountType == "BASIC") pages = pages1
  else if(userLogged.accountType == "SUPER") pages = pages2;
  else pages = pages3;
  return (
    <AppBar position="fixed">
      {/* LOGO AND APP NAME DESKTOP*/}
      <Container  maxWidth={false}>
        <Toolbar disableGutters>
          <AppIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 70, margin: 2 }} />
          <Typography
            fontSize={30}
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              if (userLogged.accountType != "BASIC" && userLogged.accountType != "SUPER") navigate("/");
              else navigate("home");
            }}
            sx={{
              cursor: "pointer",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PARKLY
          </Typography>
          {userLogged.accountType == "BASIC" || userLogged.accountType == "SUPER" && (
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: "none", md: "flex" } }}
            ></Divider>
          )}

          {/* PAGES MOBILE*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page == "RESERVATIONS") reservationsHandler();
                      if (page == "PARKING LOTS") parkingLotsHandler();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          {/* LOGO AND APP NAME MOBILE */}
          <AppIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={userLogged.accountType != "BASIC" && userLogged.accountType != "SUPER" ? "/" : "home"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PARKLY
          </Typography>

          {/* PAGES DESKTOP */}
            <Box sx={{ marginLeft: 2, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (page == "RESERVATIONS") reservationsHandler();
                    if (page == "PARKING LOTS") parkingLotsHandler();
                    if (page == "ADD RESERVATION") addReservationHandler();
                    if (page == "ADD PARKING LOT") addParkingLotHandler();
                    if (page == "ADD USER") addUserHandler();
                  }}
                  sx={{ fontSize: 20, my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

          {/* PROFILE SETTINGS */}
          <Stack
            spacing={3}
            direction="row"
            alignItems="center"
            textAlign="right"
            sx={{ alignContent: "right", flexGrow: 0 }}
          >

          {(userLogged.accountType == "BASIC" || userLogged.accountType == "SUPER") && (
              <Stack direction="column">
                <Typography textAlign="left">
                  {"Logged as " + userLogged.username}
                </Typography>
                <Typography textAlign="left">
                    {(userLogged.accountType == "BASIC" ? "Basic" : "Admin") + " account type"}
                </Typography>
              </Stack>
          )}
          {(userLogged.accountType == "BASIC" || userLogged.accountType == "SUPER") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings1.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting == "Logout") logoutHandler();
                      if (setting == "Profile") navigate('/profile');
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
