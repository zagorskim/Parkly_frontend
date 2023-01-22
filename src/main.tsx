import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <App />
        </LocalizationProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
