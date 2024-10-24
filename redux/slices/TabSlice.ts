import { createSlice } from '@reduxjs/toolkit';
import { Stack } from '@/constants/Stack';

const TabSlice = createSlice({
  name: 'tab',
  initialState: Stack,
  reducers: {
    setTabActive: (state, action) => {
      console.log(action);
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

export const { setTabActive } = TabSlice.actions;
export default TabSlice.reducer;
