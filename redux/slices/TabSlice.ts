import { createSlice } from '@reduxjs/toolkit';
import { Screens } from '@/constants/Screens';

const initialState = () => {
  let stack = JSON.parse(JSON.stringify(Screens));

  for (const [name, config] of Object.entries(stack)) {
    if (config.hasOwnProperty('component')) {
      delete config['component'];
      stack[name] = config;
    }
  }

  return stack;
}

const TabSlice = createSlice({
  name: 'tab',
  initialState: initialState(),
  reducers: {
    setTabActive: (state, action) => {
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
