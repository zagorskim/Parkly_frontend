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
import { NavBarProfile, NavBarSubpages } from "../data/AppModeData";
import Divider from "@mui/material/Divider";
import { width } from "@mui/system";
import { UserLogged } from "./../data/AppModeData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../data/UserData";

const pages1 = ["RESERVATIONS", "PARKING LOTS", "ADD RESERVATION", "ADD PARKING LOT"];
const pages2 = ["RESERVATIONS", "PARKING LOTS", "ADD RESERVATION", "ADD PARKING LOT", "ADD USER"];
const settings1 = ["Profile", "Logout"];

// MUI template navigation bar
export const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userLogged, setUserLogged] = useRecoilState(UserLogged);
  const [userData, setUserData] = useRecoilState(UserData);
  const profileState = useRecoilValue(NavBarProfile);
  const pagesState = useRecoilValue(NavBarSubpages);
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

  const logoutHandler = () => {
    setUserLogged("");
    navigate("/");
  };
  const pages = userData.accountType == "admin" ? pages2 : pages2;

  return (
    <AppBar position="static">
      {/* LOGO AND APP NAME DESKTOP*/}
      <Container>
        <Toolbar disableGutters>
          <AppIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 70, margin: 2 }} />
          <Typography
            fontSize={30}
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              if (userLogged == "" || userLogged == "guest") navigate("/");
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
          {userLogged != "" && (
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: "none", md: "flex" } }}
            ></Divider>
          )}

          {/* PAGES MOBILE*/}
          {pagesState && (
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
          )}

          {/* LOGO AND APP NAME MOBILE */}
          <AppIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={userLogged == "" || userLogged == "guest" ? "/" : "home"}
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
          {pagesState && (
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
          )}

          {/* PROFILE SETTINGS */}
          {profileState && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
