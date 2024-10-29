import { createSlice } from '@reduxjs/toolkit';
import { Stack } from '@/constants/Stack';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: Stack,
  reducers: {
    setActiveScreen: (state, action) => {
      state.map(item => {
        if (item.name == action.payload.name && item.active) {
          item.active = false;
        }
        else if (item.name == action.payload.name && !item.active) {
          item.active = true;
          item.entityId = action.payload?.entityId;
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
