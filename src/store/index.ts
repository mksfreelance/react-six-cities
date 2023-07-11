import { redirect } from './middlewares/redirect';
import { createAPI } from './../services/api';
import { configureStore } from '@reduxjs/toolkit';
import offersSlice from './offers-slice';
import commentsSlice from './comments-slice';
import userSlice from './user-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersSlice,
    comments: commentsSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
