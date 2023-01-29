import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { CircularProgress, Stack, Switch, Fade } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ParkingLotListRow } from "./ParkingLotListRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ParkingLotInquiry, RefreshParkingLots } from "../data/ParkingLotData";
import { ParkingLotDetails } from "../data/ParkingLotTypes";
import axios from "axios";
import { GET_PARKINGS_PAGE_ENDPOINT_ADDRESS } from "../ConnectionVariables";
import { UserData } from "./../data/UserData";
import { ValidateLetters, ValidateLettersAndNumbers } from "../data/ValidationFunctions";
import Grid from "@mui/material/Grid";

export const ParkingLotList: React.FC = () => {
  const [list, setList] = useRecoilState(ParkingLotInquiry);
  const [refresh, setRefresh] = useRecoilState(RefreshParkingLots);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDescending, setSortDesctnding] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchData = () => {
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .get(
        GET_PARKINGS_PAGE_ENDPOINT_ADDRESS +
          "/" +
          currentPage.toString() +
          "/sortDescending/" +
          sortDescending +
          "?filter=" +
          filter,
        config
      )
      .then((res) => {
        console.log(res);
        setList(res.data.parkingLotsDto);
        setPages(res.data.noOfPages);
        setIsLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setIsLoading(false);
      });
    console.log(list);
  };

  useEffect(() => {
    if (ValidateLettersAndNumbers(filter)) {
      setList([]);
      console.log(list);
      setIsLoading(true);
      fetchData();
    }
  }, [refresh, filter, sortDescending]);

  return (
    <Container component="main">
      <CssBaseline />

      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        <TableContainer style={{ padding: "30px" }}>
          <Stack spacing={2} direction="column">
            <TextField
              id="outlined-search"
              value={filter}
              onChange={(x) => setFilter(x.target.value)}
              label="Search parking lots by address"
              type="search"
              fullWidth
              error={!ValidateLettersAndNumbers(filter)}
              helperText={!ValidateLettersAndNumbers(filter) && "Only letters and numbers allowed"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Sort ascending</Grid>
              <Grid item>
                <Switch
                  checked={sortDescending} // relevant state for your case
                  onChange={(x) => setSortDesctnding(x.target.checked)} // relevant method to handle your change
                  value={sortDescending} // some value you need
                />
              </Grid>
              <Grid item>Sort descending</Grid>
            </Grid>
          </Stack>
          <Box mt={5}>
            <Table>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Parking Lot Address</TableCell>
                  <TableCell>Slots Total</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((parkingLot) => (
                  <ParkingLotListRow parkingLot={parkingLot} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Fade in={isLoading} unmountOnExit>
          <CircularProgress sx={{ marginBottom: 20 }} />
        </Fade>
      </Box>
    </Container>
  );
};
