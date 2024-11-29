import { createSlice } from '@reduxjs/toolkit';
import { Config } from '@/constants/Config';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    isStarted: false,
  },
  reducers: {
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
  },
});

export const { setIsStarted } = AppSlice.actions;
export default AppSlice.reducer;
