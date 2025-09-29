import { createAsyncThunk } from '@reduxjs/toolkit';
import { usersLogin, usersLogout, usersSignup, fetchCurrentUser } from '../../api/authApi';

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
  try {
    return await usersSignup(user);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Server error');
  }
});

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const { token } = await usersLogin(user);

    const fullUser = await fetchCurrentUser(token);

    return { token, user: fullUser };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message || 'Server error');
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState();

  try {
    await usersLogout(token);
  } catch ({ message }) {
    return rejectWithValue(message);
  }
});

export const fetchUser = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { token },
    } = getState();

    if (token) {
      try {
        return await fetchCurrentUser(token);
      } catch ({ message }) {
        return rejectWithValue(message);
      }
    } else {
      return rejectWithValue('Token is not available');
    }
  }
);
