import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'login', // 'login' | 'register' | 'logout'
};

const modalSlice = createSlice({
  name: 'ui/modal',
  initialState,
  reducers: {
    openModal: {
      prepare: (type = 'login', props = {}) => ({ payload: { type, props } }),
      reducer(state, action) {
        state.isOpen = true;
        state.type = action.payload.type || 'login';
      },
    },
    closeModal(state) {
      state.isOpen = false;
    },
    setModalType(state, action) {
      state.type = action.payload; // 'login' | 'register' | 'logout'
    },
  },
});

export const { openModal, closeModal, setModalType } = modalSlice.actions;

// selectors
export const selectIsModalOpen = s => s.uiModal.isOpen;
export const selectModalType = s => s.uiModal.type;
export const selectModalProps = s => s.uiModal.props;

export default modalSlice.reducer;
