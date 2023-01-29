import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { CircularProgress, Stack } from "@mui/material";
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
import { ValidateLetters, ValidateLettersAndNumbers } from '../data/ValidationFunctions';
import Pagination from '@mui/material/Pagination';

export const ParkingLotList: React.FC = () => {
  const [list, setList] = useRecoilState(ParkingLotInquiry);
  const [refresh, setRefresh] = useRecoilState(RefreshParkingLots);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDescending, setSortDescending] = useState(true);
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

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
	setCurrentPage(value);
	fetchData();
  }

  useEffect(() => {
    console.log(list);
    fetchData();
  }, [refresh, filter]);

  return (
    <Container component="main">
      <CssBaseline />

      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        {isLoading && (
          <Box mt={30}>
            <CircularProgress />
          </Box>
        )}
        {isLoading || (
          <TableContainer style={{ padding: "30px" }}>
            <TextField
              id="outlined-search"
              value={filter}
              onChange={(x) => setFilter(x.target.value)}
              label="Search parking lots"
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
			<Pagination count={pages} page={currentPage} onChange={changePage}/>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};
