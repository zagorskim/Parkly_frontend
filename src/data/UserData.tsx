import { atom, selector } from 'recoil';
import { UserDetails } from './Types';

export const UserData = atom({
    key: 'UserData',
    // default: {name: 'name', surname: 'surname', accountType: 'simple'} as UserDetails,
    default: {} as UserDetails,
})