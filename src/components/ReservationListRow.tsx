import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ReservationDetails } from '../data/ReservationTypes';
import { Button } from '@mui/material';
import { tableCellClasses } from "@mui/material/TableCell";

export function ReservationListRow(props: {reservation: ReservationDetails}) {
	const reservation = props.reservation;
	const [open, setOpen] = React.useState(false);
  
	function dateToString(date: Date): string {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
	}

	return (
	  <React.Fragment>
		<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
		  <TableCell>
			<IconButton
			  aria-label="expand row"
			  size="small"
			  onClick={() => setOpen(!open)}
			>
			  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</IconButton>
		  </TableCell>
		<TableCell>{reservation.parking_lot_address}</TableCell>
		<TableCell>{dateToString(reservation.start_date)}</TableCell>
		<TableCell>{dateToString(reservation.end_date)}</TableCell>
		<TableCell>{reservation.user_id}</TableCell>
		<TableCell><Button variant="outlined">Update</Button></TableCell>
		<TableCell><Button variant="outlined" color="warning">Cancel</Button></TableCell>
		</TableRow>
		<TableRow>
		  <TableCell style={{ paddingBottom: 5, paddingTop: 5 }} colSpan={12}>
			<Collapse in={open} timeout="auto" unmountOnExit>
			  <Box sx={{ margin: 3 }}>
				<Typography variant="h6" gutterBottom component="div" align="center">
				  Reservation Details
				</Typography>
				<Table size="small" aria-label="purchases"
					sx={{
						[`& .${tableCellClasses.root}`]: {
						borderBottom: "none"
						}
					}}
				>
				<colgroup>
				   <col style={{width:'50%'}}/>
				   <col style={{width:'50%'}}/>
				</colgroup>
				  <TableHead>
					<TableRow>
					  <TableCell align="right">Reservation ID:</TableCell>
					  <TableCell>{reservation.id}</TableCell>
					</TableRow>
					<TableRow>
					  <TableCell align="right">Parking Lot ID:</TableCell>
					  <TableCell>{reservation.parking_lot_id}</TableCell>
					</TableRow>
					<TableRow>
					  <TableCell align="right">First Name:</TableCell>
					  <TableCell>{reservation.user_first_name}</TableCell>
					</TableRow>
					<TableRow>
					  <TableCell align="right">Last Name:</TableCell>
					  <TableCell>{reservation.user_last_name}</TableCell>
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
