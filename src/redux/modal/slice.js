import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignInOpen: false,
  isSignUpOpen: false,
  isLogoutOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignIn(state) {
      state.isSignInOpen = true;
    },
    closeSignIn(state) {
      state.isSignInOpen = false;
    },
    openSignUp(state) {
      state.isSignUpOpen = true;
    },
    closeSignUp(state) {
      state.isSignUpOpen = false;
    },
    openLogout(state) {
      state.isLogoutOpen = true;
    },
    closeLogout(state) {
      state.isLogoutOpen = false;
    },
  },
});

export const { openSignIn, closeSignIn, openSignUp, closeSignUp, openLogout, closeLogout } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
