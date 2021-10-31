import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth';
import user from './features/user';
import email from './features/email-verification';
export const reducer = { auth, user, email };
export const store = configureStore({
    reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
