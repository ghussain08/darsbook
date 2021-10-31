import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuth {
    token: null | string;
}
const initialState: IAuth = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            return state;
        },
        logout() {
            localStorage.removeItem('token');
            return { token: null };
        },
    },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
