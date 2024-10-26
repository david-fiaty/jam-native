import { createSlice } from '@reduxjs/toolkit';
import { Stack } from '@/constants/Stack';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: Stack,
  reducers: {
    setActiveScreen: (state, action) => {
      state.map(item => {
        if (item.name == action.payload && item.active) {
          item.active = false;
        }
        else if (item.name == action.payload && !item.active) {
          item.active = true;
        }
        else {
          item.active = false;
        }
      });
    },
  },
});

export const { setActiveScreen } = ScreenSlice.actions;
export default ScreenSlice.reducer;
