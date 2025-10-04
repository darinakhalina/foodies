import { createSlice } from '@reduxjs/toolkit';
import { addToFavorites, removeFromFavorites, getFavoriteRecipes, addRecipe } from './operations';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    favorites: {
      recipes: [],
      total: 0,
      page: 1,
      totalPages: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearFavorites(state) {
      state.favorites = {
        recipes: [],
        total: 0,
        page: 1,
        totalPages: 0,
      };
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFavoriteRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { recipes = [], total = 0, page = 1, totalPages = 0 } = action.payload ?? {};
        state.favorites = { recipes, total, page, totalPages };
      })
      .addCase(getFavoriteRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load favorites';
      })
      .addCase(addToFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const recipeIdStr = String(action.payload?.recipeId ?? action.meta.arg);
        const exists = state.favorites.recipes.some(r => String(r.id) === recipeIdStr);
        if (exists) return;
        const idNum = Number(recipeIdStr);
        state.favorites.recipes.push({ id: Number.isNaN(idNum) ? recipeIdStr : idNum });

        state.favorites.total = state.favorites.recipes.length;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add favorite';
      })
      .addCase(removeFromFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const idStr = String(action.payload?.id ?? action.payload ?? action.meta.arg);
        const list = state.favorites.recipes ?? [];
        state.favorites.recipes = list.filter(r => String(r.id) !== idStr);
        state.favorites.total = state.favorites.recipes.length;
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove favorite';
      })
      .addCase(addRecipe.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add recipe';
      });
  },
});

export const { clearFavorites } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
