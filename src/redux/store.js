import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import modalReducer from './auth/modalSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import filtersReducer from './filters/slice';
// import { modalReducer } from './modal/slice';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    filters: filtersReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // allow redux-persist actions through
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
