import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { ReservationInquiry, RefreshReservations } from "../data/ReservationData";
import { CircularProgress, Fade } from "@mui/material";
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
import Pagination from "@mui/material/Pagination";
import { ValidateNumeric } from "../data/ValidationFunctions";
import { TokenRefreshed } from "../data/UserData";

export const ReservationList: React.FC = () => {
  const [list, setList] = useRecoilState(ReservationInquiry);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useRecoilState(RefreshReservations);
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [refreshedToken, setRefreshedToken] = useRecoilState(TokenRefreshed);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sortDescending, setSortDesctnding] = useState(true);

  const fetchData = () => {
    setList([]);
    const config = {
      headers: { Authorization: `Bearer ${userLogged.token}` },
    };
    axios
      .get(
        GET_RESERVATIONS_PAGE_ENDPOINT_ADDRESS + "/" + currentPage.toString() + "?filter=" + filter,
        config
      )
      .then((res) => {
        setList(res.data.reservationsDto);
        setPages(res.data.noOfPages);
        setIsLoading(false);
      })
      .catch((res) => {
        setIsLoading(false);
      });
  };

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    fetchData();
  };

  useEffect(() => {
    if (ValidateNumeric(filter)) {
      setIsLoading(true);
      fetchData();
    }
  }, [refreshedToken, filter, sortDescending, refresh, currentPage]);

  return (
    <Container component="main">
      <CssBaseline />

      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        <TableContainer style={{ padding: "30px" }}>
          <TextField
            id="outlined-search"
            label="Search reservations by user ID"
            type="search"
            fullWidth
            value={filter}
            onChange={(x) => {
              setCurrentPage(1);
              setFilter(x.target.value);
            }}
            error={!ValidateNumeric(filter)}
            helperText={!ValidateNumeric(filter) && "Only letters and numbers allowed"}
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
          <Pagination
            style={{ marginTop: 10 }}
            count={pages}
            page={currentPage}
            onChange={changePage}
          />
        </TableContainer>
      </Box>
      <Box mt={3} sx={{ height: 40 }}></Box>
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
