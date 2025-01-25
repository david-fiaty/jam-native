import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: [],
  reducers: {
    setActiveModal: (state, action) => {
      let screens: any = [...state];
      let index: any = screens.findIndex((o: any) => o.name == action.payload.name);

      if (index === -1) {
        let screen = Modals.find((o: any) => o.name == action.payload.name);
        screens.push({ ...screen, ...{ params: action.payload.params }});
      }
      else {
        delete screens[index];
        screens = screens.filter((o: any) => o);
      }

      return screens;
    },
  },
});

export const { setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
