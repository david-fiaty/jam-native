import { createSlice } from '@reduxjs/toolkit';

const TabSlice = createSlice({
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

export const { setActive } = TabSlice.actions;
export default TabSlice.reducer;
