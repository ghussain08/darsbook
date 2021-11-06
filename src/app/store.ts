import { configureStore } from '@reduxjs/toolkit';
import user from './features/user';
import email from './features/email-verification';
import { seedsApi } from './features/seeds';
import { setupListeners } from '@reduxjs/toolkit/query';
export const reducer = { user, email, [seedsApi.reducerPath]: seedsApi.reducer };
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(seedsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;