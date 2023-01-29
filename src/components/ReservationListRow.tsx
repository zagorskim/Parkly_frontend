import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ReservationDetails } from "../data/ReservationTypes";
import { Button, setRef } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useRecoilState } from "recoil";
import { UserData } from "./../data/UserData";
import axios from "axios";
import { CANCEL_RESERVATION_ENDPOINT_ADDRESS } from "../ConnectionVariables";
import { AllParkingLots } from "./../data/ParkingLotData";
import { ParkingLotDetails } from "../data/ParkingLotTypes";
import { RefreshReservations } from '../data/ReservationData';

export function ReservationListRow(props: { reservation: ReservationDetails }) {
  const reservation = props.reservation;
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [parkings, setParkings] = useRecoilState(AllParkingLots);
  const [refresh, setRefresh] = useRecoilState(RefreshReservations);
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .delete(CANCEL_RESERVATION_ENDPOINT_ADDRESS + "/" + reservation.reservationId, config)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {parkings.find((value) => {
            return value.id == reservation.parkingId;
          }) != null
            ? (
                parkings.find((value) => {
                  return value.id == reservation.parkingId;
                }) as ParkingLotDetails
              ).name
            : ""}
        </TableCell>
        <TableCell>{reservation.startDate}</TableCell>
        <TableCell>{reservation.endDate}</TableCell>
        <TableCell>{reservation.userId}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={handleCancel} color="warning">
            Cancel
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Typography variant="h6" gutterBottom component="div" align="center">
                Reservation Details
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Reservation ID:</TableCell>
                    <TableCell>{reservation.reservationId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Parking Lot ID:</TableCell>
                    <TableCell>{reservation.parkingId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Description:</TableCell>
                    <TableCell>{reservation.description}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
