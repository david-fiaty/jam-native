import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: Modals,
  reducers: {
    setActiveScreen: (state, action) => {
      state.map(item => {
        if (item.name == action.payload.name && item.active) {
          item.active = false;
        }
        else if (item.name == action.payload.name && !item.active) {
          item.active = true;
          item.entity = action.payload.entity;
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
