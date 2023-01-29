import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { ReservationInquiry, RefreshReservations } from "../data/ReservationData";
import { CircularProgress, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReservationListRow } from "./ReservationListRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { UserData } from "./../data/UserData";
import { GET_RESERVATIONS_PAGE_ENDPOINT_ADDRESS } from "../ConnectionVariables";
import { ValidateLettersAndNumbers } from './../data/ValidationFunctions';
import Pagination from '@mui/material/Pagination';

export const ReservationList: React.FC = () => {
  const [list, setList] = useRecoilState(ReservationInquiry);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useRecoilState(RefreshReservations);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const fetchData = () => {
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .get(
        GET_RESERVATIONS_PAGE_ENDPOINT_ADDRESS + "/" + currentPage.toString() + "?filter=" + filter,
        config
      )
      .then((res) => {
        console.log(res);
        setList(res.data.reservationsDto);
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
    fetchData();
	console.log(filter)
  }, [filter]);

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
              label="Search reservations"
              type="search"
              fullWidth
			  value={filter}
              onChange={(x) => setFilter(x.target.value)}
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
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((reservation) => (
                    <ReservationListRow reservation={reservation} />
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
