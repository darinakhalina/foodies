import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import filtersReducer from './filters/slice';
import modalReducer from './ui/modalSlice';
import { recipesReducer } from './recipes/slice';
import { userReducer } from './user/slice';
import { areasReducer } from './areas/slice';
import { categoriesReducer } from './categories/slice';
import { ingredientsReducer } from './ingredients/slice';

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
    areas: areasReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
    user: userReducer,
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
