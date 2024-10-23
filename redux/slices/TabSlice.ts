import { createSlice } from '@reduxjs/toolkit';

const TabSlice = createSlice({
  name: 'tab',
  initialState: {
    active: null,
  },
  reducers: {
    setTabActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setTabActive } = TabSlice.actions;
export default TabSlice.reducer;
