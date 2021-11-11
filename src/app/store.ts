import { configureStore } from "@reduxjs/toolkit";
import user from "./features/user";
import email from "./features/email-verification";
import { setupListeners } from "@reduxjs/toolkit/query";
import coreQuery from "../utils/core-rtk-query";
export const reducer = {
    user,
    email,
    [coreQuery.reducerPath]: coreQuery.reducer,
};
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coreQuery.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
