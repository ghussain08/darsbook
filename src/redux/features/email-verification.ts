import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmailVerificationState {
    email: string;
}

type emailVerificationType = EmailVerificationState | null;
const initialState: null | EmailVerificationState = null as emailVerificationType;

const emailVerificationEmail = createSlice({
    name: 'emailVerification',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<EmailVerificationState | null>) {
            return action.payload;
        },
    },
});

export const { setEmail } = emailVerificationEmail.actions;

export default emailVerificationEmail.reducer;
