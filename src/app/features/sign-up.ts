import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignupPayload } from '../../types/signup/signup.types';

const initialState: ISignupPayload = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
};

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setSignUpData(state, action: PayloadAction<ISignupPayload>) {
            return action.payload;
        },
    },
});

export const { setSignUpData } = signupSlice.actions;

export default signupSlice.reducer;
