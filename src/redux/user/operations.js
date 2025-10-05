import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async ({ file, token }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await axios.patch(`${apiUrl}/api/users/me/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.avatar;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Ошибка при загрузке аватара');
    }
  }
);

export const subscribeOnUser = createAsyncThunk(
  'user/subscribe',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/${id}/subscribe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.status === 200 ? true : false;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unsubscribeOnUser = createAsyncThunk(
  'user/unsubscribe',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/users/${id}/unsubscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.status === 204 ? false : true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk('user/info', async ({ id, token }, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
