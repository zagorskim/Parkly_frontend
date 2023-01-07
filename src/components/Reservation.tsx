import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { InquiryDetails } from "../data/Types";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
export const Reservation: React.FC<InquiryDetails> = (props) => {
  const [data, setData] = useState(props);

  return (
    <Box sx={{border: '1px solid #1976d2' }} borderRadius={3} padding={2} margin={1} border={1} display="flex">
      <Stack direction="row" spacing={2} display="flex">
        <Typography variant="h5">{data.bankName}</Typography>
        <Typography variant="h5">{data.amount}</Typography>
      </Stack>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Stack spacing={2} direction="row">
          <Button variant="outlined">Details</Button>
          <Button variant="outlined">Delete</Button>
        </Stack>
      </Box>
      <Outlet></Outlet>
    </Box>
  );
};
