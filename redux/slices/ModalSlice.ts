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
      return action.payload;
    },
    setActiveModal: (state, action) => {
      let activeModals: any = [...state.active];
      let index: any = activeModals.findIndex((o: any) => o.name == action.payload.name);

      if (index === -1) {
        let screen = Modals.find((o: any) => o.name == action.payload.name);
        activeModals.push({ ...screen, ...{ params: action.payload.params }});
      }
      else {
        delete activeModals[index];
        activeModals = activeModals.filter(Boolean);
      }

      return activeModals;
    },
  },
});

export const { setModalConfig, setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
