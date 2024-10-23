import { createSlice } from '@reduxjs/toolkit';

const TabSlice = createSlice({
  name: 'tab',
  initialState: {
    active: null,
  },
  reducers: {
    active: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { active } = TabSlice.actions;
export default TabSlice.reducer;
