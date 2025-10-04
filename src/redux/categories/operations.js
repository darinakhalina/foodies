import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../../api/categories';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchCategories(token, { limit: 999 });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
