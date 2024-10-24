import { createSlice } from '@reduxjs/toolkit';

const TabSlice = createSlice({
  name: 'tab',
  initialState: {},
  reducers: {
    setInitialState: (state, action) => {
      for (const [name, config] of Object.entries(action.payload.screens)) {
        if (config.hasOwnProperty('component')) {
          delete config['component'];
          state[name] = config;
        }
      }    
    },
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

export const { setTabActive, setInitialState } = TabSlice.actions;
export default TabSlice.reducer;
