import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: {
    footerLayout: null,
  },
  reducers: {
    setFooterLayout: (state, action) => {
      state.footerLayout = action.payload;
    },
  },
});

export const { setFooterLayout } = ScreenSlice.actions;
export default ScreenSlice.reducer;