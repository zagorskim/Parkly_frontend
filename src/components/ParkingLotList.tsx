import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { CircularProgress, Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ParkingLotListRow } from './ParkingLotListRow';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { ParkingLotInquiry } from '../data/ParkingLotData';

export const ParkingLotList: React.FC = () => {
    const [list, setList] = useRecoilState(ParkingLotInquiry);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log(list);
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
					<TextField id="outlined-search" label="Search parking lots" type="search" fullWidth
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
						  <TableCell>Slots Total</TableCell>
						  <TableCell>Slots Available</TableCell>
						  <TableCell>Type</TableCell>
						  <TableCell>{ }</TableCell>
						  <TableCell>{ }</TableCell>
						</TableRow>
					  </TableHead>
					  <TableBody>
						{list.map((parkingLot) => (
						  <ParkingLotListRow parkingLot={parkingLot}/>
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
