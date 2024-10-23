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

const TabSlice = createSlice({
  name: 'tab',
  initialState: initialState(),
  reducers: {
    setTabActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setTabActive } = TabSlice.actions;
export default TabSlice.reducer;
