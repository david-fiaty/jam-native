import { createSlice } from '@reduxjs/toolkit';
import { Config } from '@/constants/Config';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    isStarted: false,
    language: Config.defaultLanguage,
  },
  reducers: {
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setIsStarted, setLanguage } = AppSlice.actions;
export default AppSlice.reducer;
