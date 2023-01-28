import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
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
import { FETCH_USER_DATA_ENDPOINT_ADDRESS } from "./ConnectionVariables";
import { useRecoilState } from "recoil";
import { UserData } from "./data/UserData";
import axios from "axios";
import { UserDetails } from "./data/Types";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      };
      axios
        .get(FETCH_USER_DATA_ENDPOINT_ADDRESS, config)
        .then((res) => {
          console.log(res);
          setUserLogged({
            token: sessionStorage.getItem("token"),
            accountType: res.data.userType,
            username: res.data.username,
            email: res.data.email,
          } as UserDetails);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      navigate("/");
    }
    console.log(userLogged);
  }, [userLogged.accountType]);

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
