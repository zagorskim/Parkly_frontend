import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Stack } from '@mui/material';
import { Reservation } from './Reservation';

export const ReservationList: React.FC = () => {

    const list = [{bankName: 'parking address', amount: 'from - to'}];

    return (
        <Box>
            <Stack direction='column'>
                {list.map((x) => {
                    return <Reservation bankName={x.bankName} amount={x.amount}></Reservation>
                    return 'a';
                    })}
            </Stack>
            <Outlet></Outlet>
        </Box>
    )
} 