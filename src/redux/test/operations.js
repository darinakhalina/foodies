import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTest, getTestById } from '../../api/test-api';

export const fetchTest = createAsyncThunk('test/fetchTest', async (_, thunkAPI) => {
  try {
    const data = await getTest({ _limit: 5 });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchTestById = createAsyncThunk('test/fetchPostById', async (id, thunkAPI) => {
  try {
    const data = await getTestById(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
