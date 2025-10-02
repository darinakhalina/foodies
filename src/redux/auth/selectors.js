export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectIsFetchingUser = state => state.auth.isFetchingUser;
export const selectUserLoading = state => state.auth.isLoadingUser;
export const selectUserError = state => state.auth.userError;
export const selectIsOpenModal = state => state.modal.isOpen;
