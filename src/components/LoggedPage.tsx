import Box from '@mui/material/Box';
import { UserLogged } from '../data/AppModeData';
import { useRecoilState } from 'recoil';
import { ReservationList } from './ReservationList';

export const LoggedPage: React.FC = () => {

    const [userLogged, setUserLogged] = useRecoilState(UserLogged);

    return (
        <Box>
            <p><b>User type:</b> {userLogged}</p>
        </Box>
    )
}  