import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    active: null,
  },
  reducers: {
    active: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { active } = ModalSlice.actions;
export default ModalSlice.reducer;
