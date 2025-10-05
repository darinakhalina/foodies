import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './operations';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: {
      items: [],
      total: 0,
      page: 1,
      totalPages: 0,
    },
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { items = [], total = 0, page = 1, totalPages = 0 } = action.payload.data ?? {};
        state.ingredients = { items, total, page, totalPages };
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load ingredients';
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
