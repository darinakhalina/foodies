import { createSlice } from '@reduxjs/toolkit';
import { fetchTest, fetchTestById } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.posts = [];
};

const userSlice = createSlice({
  name: 'test',
  initialState: {
    currentPost: null,
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTest.pending, handlePending)
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTest.rejected, handleRejected)
      .addCase(fetchTestById.pending, state => {
        state.loading = true;
        state.error = null;
        state.currentPost = null;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const testReducer = userSlice.reducer;
