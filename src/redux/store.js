import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import filtersReducer from './filters/slice';
import { modalReducer } from './modal/slice';
import { recipesReducer } from './recipes/slice';

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
    recipes: recipesReducer,
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
