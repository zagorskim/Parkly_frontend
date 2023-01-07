import { atom, selector } from 'recoil';
import { UserDetails, InquiryDetails } from './Types';

export const UserData = atom({
    key: 'UserData',
    default: {name: 'name', surname: 'surname'} as UserDetails,
})

export const UserInquiries = atom({
    key: 'UserInquiries',
    default: [{bankName: 'bankName', amount: 0} as InquiryDetails, {bankName: 'bankName', amount: 0} as InquiryDetails] as InquiryDetails[],
})