import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'login', // 'login' | 'register' | 'logout'
  props: {},
};

const modalSlice = createSlice({
  name: 'ui/modal',
  initialState,
  reducers: {
    openModal: {
      prepare: (type, props = {}) => ({ payload: { type, props } }),
      reducer(state, action) {
        state.isOpen = true;
        state.type = action.payload.type;
        state.props = action.payload.props;
      },
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.props = {};
    },
    setModalType(state, action) {
      state.type = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalType } = modalSlice.actions;

export const selectIsModalOpen = s => s.modal.isOpen;
export const selectModalType = s => s.modal.type;
export const selectModalProps = s => s.modal.props;

export default modalSlice.reducer;
