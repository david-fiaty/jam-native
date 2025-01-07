import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: [],
  reducers: {
    setActiveScreen: (state, action) => {
      let screens: any = [...state];
      let index: any = screens.findIndex((o: any) => o.name == action.payload.name);
      
      if (index === -1) {
        screens.push(Modals.find((o: any) => o.name == action.payload.name));
      }
      else {
        delete screens[index];
        screens = screens.filter((o: any) => o);
      }

      state = screens;
    },
  },
});

export const { setActiveScreen } = ScreenSlice.actions;
export default ScreenSlice.reducer;
