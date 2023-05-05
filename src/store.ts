import moviesReducer from './features/moviesSlice'
import { configureStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Action } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

export const store = configureStore({
  reducer: {
    movies: moviesReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk),
});

export default store;

