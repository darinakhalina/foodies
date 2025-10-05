import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAreas } from '../../api/areas';

export const getAreas = createAsyncThunk(
  'areas/getAreas',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      return await fetchAreas(token, { limit: 999 });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
