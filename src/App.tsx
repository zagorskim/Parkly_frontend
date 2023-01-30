import { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SessionChoicePage } from "./components/SessionChoicePage";
import { LoginPage } from "./components/LoginPage";
import { ReservationForm } from "./components/ReservationForm";
import { LoggedPage } from "./components/LoggedPage";
import { Error404Page } from "./components/Error404Page";
import { ReservationList } from "./components/ReservationList";
import { ParkingLotList } from "./components/ParkingLotList";
import { ParkingLotForm } from "./components/ParkingLotForm";
import { UserForm } from "./components/UserForm";
import {
  FETCH_USER_DATA_ENDPOINT_ADDRESS,
  GET_PARKINGS_PAGE_ENDPOINT_ADDRESS,
  GET_RESERVATIONS_PAGE_ENDPOINT_ADDRESS,
} from "./ConnectionVariables";
import { useRecoilState } from "recoil";
import { UserData, TokenRefreshed, LoggedFlag } from "./data/UserData";
import axios from "axios";
import { UserDetails } from "./data/Types";
import { ProfilePage } from "./components/ProfilePage";
import { AllParkingLots } from "./data/ParkingLotData";
import { AllReservations } from "./data/ReservationData";

function App() {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [parkings, setParkings] = useRecoilState(AllParkingLots);
  const [reservations, setReservations] = useRecoilState(AllReservations);
  const [refreshedToken, setRefreshedToken] = useRecoilState(TokenRefreshed);
  const [logged, setLogged] = useRecoilState(LoggedFlag);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      };
      axios
        .get(FETCH_USER_DATA_ENDPOINT_ADDRESS, config)
        .then((res) => {
          setUserLogged({
            token: sessionStorage.getItem("token"),
            accountType: res.data.userType,
            username: res.data.username,
            email: res.data.email,
          } as UserDetails);
        })
        .then((res) => {
          setRefreshedToken(!refreshedToken);
        })
        .catch((res) => {});
      axios
        .get(GET_PARKINGS_PAGE_ENDPOINT_ADDRESS + "/-1" + "/sortDescending/true", config)
        .then((res) => {
          setParkings(res.data.parkingLotsDto);
        })
        .catch((res) => {});
      axios
        .get(GET_RESERVATIONS_PAGE_ENDPOINT_ADDRESS + "/-1", config)
        .then((res) => {
          setReservations(res.data.reservationsDto);
        })
        .catch((res) => {});
    } else {
      navigate("/");
    }
  }, [logged]);

  return (
    <div className="App">
      <div style={{ height: 110 }} />
      <NavBar />
      <Routes>
        <Route path="/" element={<SessionChoicePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<LoggedPage />} />
        <Route path="home/reservations" element={<ReservationList />} />
        <Route path="home/parkinglots" element={<ParkingLotList />} />
        <Route path="home/addreservation" element={<ReservationForm />} />
        <Route path="home/addparkinglot" element={<ParkingLotForm />} />
        <Route path="home/adduser" element={<UserForm />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  );
}

export default App;
