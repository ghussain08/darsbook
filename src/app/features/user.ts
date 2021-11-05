import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
    appId: number;
    email: string;
    userId: number;
    isActive: 0 | 1;
    isVerified: 0 | 1;
    registeredOn: string;
    updatedOn: string;
    firstName: string;
    lastName: string | null;
}
type IUserInitialState = IUserState | null;

const initialState: IUserInitialState = null as IUserInitialState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState | null>) => {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
