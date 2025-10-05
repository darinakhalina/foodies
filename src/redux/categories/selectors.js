export const selectCategories = state => state.categories.categories?.items ?? [];

export const selectCategoriesMeta = state => ({
  total: state.categories.categories?.total ?? 0,
  page: state.categories.categories?.page ?? 1,
  totalPages: state.categories.categories?.totalPages ?? 0,
});

export const selectFavoritesLoading = state => state.categories.loading;
export const selectFavoritesError = state => state.categories.error;
