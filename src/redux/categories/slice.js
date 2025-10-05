import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: {
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
      .addCase(getCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { data = [], total = 0, page = 1, totalPages = 0 } = action.payload ?? {};
        state.categories = { items: data, total, page, totalPages };
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load categories';
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
