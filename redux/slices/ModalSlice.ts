import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    active: [],
  },
  reducers: {
    setActiveModals: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveModals } = ModalSlice.actions;
export default ModalSlice.reducer;
