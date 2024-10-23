import { createSlice } from '@reduxjs/toolkit';

export const TabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    active: null,
  },
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = TabsSlice.actions;
export default TabsSlice.reducer;
