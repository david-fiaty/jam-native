import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    active: [],
  },
  reducers: {
    setActiveModal: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
