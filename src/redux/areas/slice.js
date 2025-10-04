import { createSlice } from '@reduxjs/toolkit';
import { getAreas } from './operations';

const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    areas: {
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
      .addCase(getAreas.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { items = [], total = 0, page = 1, totalPages = 0 } = action.payload.data ?? {};
        state.areas = { items, total, page, totalPages };
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load areas';
      });
  },
});

export const areasReducer = areasSlice.reducer;
