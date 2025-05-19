import { createSlice } from '@reduxjs/toolkit';

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
