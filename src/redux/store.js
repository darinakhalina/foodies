import { configureStore } from '@reduxjs/toolkit';

const noopReducer = (state = {}) => state;

export const store = configureStore({
  reducer: noopReducer,
});
