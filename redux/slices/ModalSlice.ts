import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalId: '',
  },
  reducers: {
    setModalId: (state, action) => {
      state.modalId = action.payload;
    },
  },
});

export const { setModalId } = ModalSlice.actions;
export default ModalSlice.reducer;
