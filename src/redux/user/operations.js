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
