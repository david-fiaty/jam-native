import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: [],
  reducers: {
    setActiveScreen: (state, action) => {
      if (state.length) {
        
      }
      
      //let currentScreen: any = Modals.find((o: any) => o.name == action.payload.name);

    
      /*
    
      state.map(item => {
        if (item.name == action.payload.name && item.active) {
          item.active = false;
        }
        else if (item.name == action.payload.name && !item.active) {
          item.active = true;
          item.params = action.payload.params;
        }
        else {
          item.active = false;
        }
      });


      */
    },
  },
});

export const { setActiveScreen } = ScreenSlice.actions;
export default ScreenSlice.reducer;
