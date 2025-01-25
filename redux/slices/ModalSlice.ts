import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    config: [],
    active: [],
  },
  reducers: {
    setModalConfig: (state, action) => {
      state.config = action.payload;
      //return action.payload;
    },
    setActiveModal: (state, action) => {
      let activeModals: any = [...state.active || []];
      let activeModalIndex: any = activeModals.findIndex((o: any) => o.name == action.payload.name);
      if (activeModalIndex === -1)  {
        activeModals.push(action.payload);
        return activeModals;
      }
      else {
        delete activeModals[activeModalIndex];
        return activeModals.filter(Boolean);
      }
    },
  },
});

export const { setModalConfig, setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
