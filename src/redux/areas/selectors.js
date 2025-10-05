export const selectAreas = state => state.areas.areas?.items ?? [];

export const selectAreasMeta = state => ({
  total: state.areas.areas?.total ?? 0,
  page: state.areas.areas?.page ?? 1,
  totalPages: state.areas.areas?.totalPages ?? 0,
});

export const selectFavoritesLoading = state => state.areas.loading;
export const selectFavoritesError = state => state.areas.error;
