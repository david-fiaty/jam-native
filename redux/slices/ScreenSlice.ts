import { createSlice } from '@reduxjs/toolkit';
import { Screens } from '@/constants/Screens';

const initialState = () => {
  for (const [name, config] of Object.entries(Screens)) {
    console.log(name, config);
  }

  return {
    active: null,
  };
}

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: initialState(),
  reducers: {
    setScreenActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setScreenActive } = ScreenSlice.actions;
export default ScreenSlice.reducer;
