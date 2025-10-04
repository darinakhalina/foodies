export const selectIngredients = state => state.ingredients.ingredients?.items ?? [];

export const selectIngredientsMeta = state => ({
  total: state.ingredients.ingredients?.total ?? 0,
  page: state.ingredients.ingredients?.page ?? 1,
  totalPages: state.ingredients.ingredients?.totalPages ?? 0,
});

export const selectFavoritesLoading = state => state.ingredients.loading;
export const selectFavoritesError = state => state.ingredients.error;
