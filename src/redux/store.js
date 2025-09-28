import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from './test/slice';
import filtersReducer from './test/filters/slice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    filters: filtersReducer,
  },
});
