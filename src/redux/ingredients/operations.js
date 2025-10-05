import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from '../../api/ingredients';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchIngredients(token, { limit: 999 });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
