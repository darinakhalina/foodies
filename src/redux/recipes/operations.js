import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  getFavoritesApi,
} from '../../api/recipes';

export const addToFavorites = createAsyncThunk(
  'recipes/addToFavorites',
  async (recipeId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await addRecipeToFavorites(token, recipeId);
      return recipeId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'recipes/removeFromFavorites',
  async (recipeId, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      await removeRecipeFromFavorites(token, recipeId);
      return recipeId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFavoriteRecipes = createAsyncThunk(
  'recipes/getFavorites',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await getFavoritesApi(token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
