import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  area: '', 
  ingredient: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setArea(state, action) {
      state.area = action.payload || '';
    },
    setIngredient(state, action) {
      state.ingredient = action.payload || '';
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setArea, setIngredient, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
