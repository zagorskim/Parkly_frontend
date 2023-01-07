import { atom, selector } from 'recoil';

export const UserLogged = atom({
    key: 'UserLogged',
    default: '',
})

export const NavBarProfile = selector({
    key: 'NavBarProfile',
    get: ({ get }) => {
        const user = get(UserLogged);
        switch(user){
            case '':
                return false;
                break;
            case 'guest':
                return false;
                break;
            case 'simple':
                return true;
                break;
            case 'employee':
                return true;
                break;
            case 'admin':
                return false;
                break;
            }
    }
    })

export const NavBarSubpages = selector({
    key: 'NavBarSubpages',
    get: ({ get }) => {
        const user = get(UserLogged);
        switch(user){
            case '':
                return false;
                break;
            case 'guest':
                return true;
                break;
            case 'simple':
                return true;
                break;
            case 'employee':
                return false;
                break;
            case 'admin':
                return true;
                break;
            }
    }
})