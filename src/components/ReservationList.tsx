import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { ReservationInquiry } from '../data/ReservationData';
import { CircularProgress, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReservationListRow } from './ReservationListRow';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import { Reservation } from './Reservation';

export const ReservationList: React.FC = () => {
    const [list, setList] = useRecoilState(ReservationInquiry);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	});

    return (
        <Container component="main">
            <CssBaseline />
			
			<Box
				mt={5}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				{isLoading && (
					<Box mt={30}>
						<CircularProgress/>
					</Box>
				)}
				{isLoading || (
					<TableContainer style={{padding: "30px"}}>
					<TextField id="outlined-search" label="Search reservations" type="search" fullWidth
					InputProps={{
						endAdornment: (
						  <InputAdornment position="start">
							<SearchIcon />
						  </InputAdornment>
						 )
						}}
					/>
					<Box mt={5}><Table>
				<colgroup>
				   <col style={{width:'10%'}}/>
				   <col style={{width:'25%'}}/>
				   <col style={{width:'15%'}}/>
				   <col style={{width:'15%'}}/>
				   <col style={{width:'15%'}}/>
				   <col style={{width:'10%'}}/>
				   <col style={{width:'10%'}}/>
				</colgroup>
					  <TableHead>
						<TableRow>
						  <TableCell></TableCell>
						  <TableCell>Parking Lot Address</TableCell>
						  <TableCell>Start Date</TableCell>
						  <TableCell>End Date</TableCell>
						  <TableCell>User ID</TableCell>
						  <TableCell>{ }</TableCell>
						  <TableCell>{ }</TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>
						{list.map((reservation) => (
						  <ReservationListRow reservation={reservation}/>
						))}
					  </TableBody>
					</Table>
					</Box>
				  </TableContainer>
				)}
			</Box>
		</Container>

    )
} 