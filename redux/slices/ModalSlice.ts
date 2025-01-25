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
    },
    setActiveModal: (state, action) => {
      let activeModals: any = [...state.active || []];
      let activeModalIndex: any = activeModals.findIndex((o: any) => o.name == action.payload.name);
      if (activeModalIndex === -1)  {
        activeModals.push(action.payload);
        state.active = activeModals; 
      }
      else {
        delete activeModals[activeModalIndex];
        state.active = activeModals.filter(Boolean);
      }
    },
  },
});

export const { setModalConfig, setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
