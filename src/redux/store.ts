import { configureStore } from '@reduxjs/toolkit';
import signupPayload from './features/sign-up';
import auth from './features/auth';
import user from './features/user';
export const reducer = { signupPayload, auth, user };
export const store = configureStore({
    reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
