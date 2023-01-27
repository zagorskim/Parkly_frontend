import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { ReservationList } from './ReservationList';
import { UserData } from './../data/UserData';

export const LoggedPage: React.FC = () => {

    const [userLogged, setUserLogged] = useRecoilState(UserData);

    return (
        <Box>
            <p><b>User type:</b> {userLogged.accountType}</p>
        </Box>
    )
}  