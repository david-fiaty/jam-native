import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'tab',
  initialState: {
    active: null,
  },
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = ModalSlice.actions;
export default ModalSlice.reducer;
