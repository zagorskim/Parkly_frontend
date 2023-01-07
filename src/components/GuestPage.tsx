import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { InquiryList } from './ReservationList';

export const GuestPage: React.FC = () => {

    return (
        <Box>
            GUEST PLACEHOLDER
            <Outlet></Outlet>
        </Box>
    )
} 