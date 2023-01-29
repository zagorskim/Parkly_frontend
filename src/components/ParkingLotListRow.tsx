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
import { ParkingLotDetails } from "../data/ParkingLotTypes";
import { Button } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { ParkingLotForm } from "./ParkingLotForm";
import { useRecoilState } from "recoil";
import { ParkingLotFormMode, ParkingLotInquiry, RefreshParkingLots } from "../data/ParkingLotData";
import { UserData } from "./../data/UserData";
import axios from "axios";
import { DELETE_PARKING_ENDPOINT_ADDRESS } from "../ConnectionVariables";

export function ParkingLotListRow(props: { parkingLot: ParkingLotDetails }) {
  const parkingLot = props.parkingLot;
  const [modeData, setModeData] = useRecoilState(ParkingLotFormMode);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [list, setList] = useRecoilState(ParkingLotInquiry);
  const [refresh, setRefresh] = useRecoilState(RefreshParkingLots);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  function dateToString(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
  }

  const handleUpdate = () => {
    const tempData = parkingLot;
    setModeData({ data: tempData, mode: "update" });
    setDialogOpen(true);
  };

  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .delete(DELETE_PARKING_ENDPOINT_ADDRESS + "/" + parkingLot.id, config)
      .then((res) => {
        console.log(res);
        setList([]);
        setRefresh(!refresh);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleClose = () => {
    setDialogOpen(false);
    setModeData({
      mode: "create",
      data: {} as ParkingLotDetails,
    });
  };

  return (
    <React.Fragment>
      <Dialog maxWidth="lg" open={dialogOpen} onClose={handleClose}>
        <ParkingLotForm />
      </Dialog>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{parkingLot.name}</TableCell>
        <TableCell>{parkingLot.capacity}</TableCell>
        <TableCell>{parkingLot.parkingLotType}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={handleUpdate}>
            Update
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" onClick={handleDelete} color="warning">
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Typography variant="h6" gutterBottom component="div" align="center">
                Parking Lot Details
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
                    <TableCell align="right">Parking Lot ID:</TableCell>
                    <TableCell>{parkingLot.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Longitude:</TableCell>
                    <TableCell>{parkingLot.longitude}° E</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Lattitude:</TableCell>
                    <TableCell>{parkingLot.latitude}° N</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Price Per Day:</TableCell>
                    <TableCell>{parkingLot.pricePerDay} zł</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Is Secured:</TableCell>
                    <TableCell>{parkingLot.security ? "Yes" : "No"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Description:</TableCell>
                    <TableCell>{parkingLot.description}</TableCell>
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
