import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import { SessionChoicePage } from './components/SessionChoicePage';
import { LoginPage } from './components/LoginPage';
import { ReservationForm } from './components/ReservationForm';
import { LoggedPage } from './components/LoggedPage';
import { Error404Page } from './components/Error404Page';
import { ReservationList } from './components/ReservationList';
import { ParkingLotList } from './components/ParkingLotList';
import { ParkingLotForm } from './components/ParkingLotForm';
import { UserForm } from './components/UserForm';
import Button from '@mui/material/Button';


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <NavBar /> 
      <Routes>
        <Route path='/' element={<SessionChoicePage/>}/>
        <Route path ='login' element={<LoginPage/>}/>
        <Route path ='home' element={<LoggedPage/>}/>
        <Route path='home/reservations' element={<ReservationList/>}/>
        <Route path='home/parkinglots' element={<ParkingLotList/>}/>
        <Route path='home/addreservation' element={<ReservationForm/>}/>
        <Route path='home/addparkinglot' element={<ParkingLotForm/>}/>
        <Route path='home/adduser' element={<UserForm/>}/>

        <Route path="*" element={<Error404Page />} />
      </Routes>
    </div>
  )
}

export default App
