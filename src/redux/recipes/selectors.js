const normId = v => (v == null ? '' : String(v));

export const selectFavorites = state => state.recipes.favorites?.recipes ?? [];

export const selectFavoritesMeta = state => ({
  total: state.recipes.favorites?.total ?? 0,
  page: state.recipes.favorites?.page ?? 1,
  totalPages: state.recipes.favorites?.totalPages ?? 0,
});

export const selectIsFavorite = recipeId => state => {
  const id = normId(recipeId);
  const list = state.recipes.favorites?.recipes ?? [];
  return list.some(r => normId(r.id) === id);
};
