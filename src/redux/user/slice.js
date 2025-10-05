import { createSlice } from '@reduxjs/toolkit';
import { getUser, subscribeOnUser, unsubscribeOnUser } from './operations';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(subscribeOnUser.fulfilled, (state, action) => {
        state.user.isSubscribed = action.payload;
      })
      .addCase(unsubscribeOnUser.fulfilled, (state, action) => {
        state.user.isSubscribed = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
