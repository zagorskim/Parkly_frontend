import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInquiries } from '../data/UserData';
import { Stack } from '@mui/material';
import { Reservation } from './Reservation';
import { InquiryDetails } from '../data/Types';

export const ReservationList: React.FC = () => {

    const list = useRecoilState(UserInquiries);

    return (
        <Box>
            <Stack direction='column'>
                {list[0].map((x) => {
                    return <Reservation bankName={x.bankName} amount={x.amount}></Reservation>
                    return 'a';
                    })}
            </Stack>
            <Outlet></Outlet>
        </Box>
    )
} 