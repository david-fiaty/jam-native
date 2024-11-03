import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: [],
  reducers: {
    setScreenState: (state, action) => {
      state = action.payload;
    },    
    setActiveScreen: (state, action) => {
      state.map((item: any) => {
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

export const { setScreenState, setActiveScreen } = ScreenSlice.actions;
export default ScreenSlice.reducer;
