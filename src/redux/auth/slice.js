import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, fetchUser } from './operations';
import { uploadAvatar } from '../user/operations';

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  isLoggedIn: false,
  isFetchingUser: false,
};

const authorization = (state, action) => {
  const { token, user } = action.payload;
  if (token) {
    state.user = user;
    state.token = token;
    state.isLoggedIn = true;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        authorization(state, action);
      })
      .addCase(register.fulfilled, authorization)
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(fetchUser.pending, state => {
        state.isFetchingUser = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingUser = false;
      })
      .addCase(fetchUser.rejected, state => {
        state.isFetchingUser = false;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
