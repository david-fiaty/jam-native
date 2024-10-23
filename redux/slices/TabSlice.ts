import { createSlice } from '@reduxjs/toolkit';
import { Screens } from '@/constants/Screens';

const initialState = () => {
  let stack = {...Screens};

  for (const [name, config] of Object.entries(stack)) {
    if (config.hasOwnProperty('component')) {
      //delete config['component'];
      stack[name] = config;
    }
  }

  console.log('------');
  console.log(stack);

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
