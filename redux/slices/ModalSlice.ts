import { createSlice } from '@reduxjs/toolkit';
import { Modals } from '@/constants/Modals';

const getModals = () => {
  return Modals.map(({component, ...rest}) => ({...rest}));
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState: [],
  reducers: {
    setActiveModal: (state, action) => {
      let modals: any = getModals();
      let modalState: any = [...state];
      let index: any = modalState.findIndex((o: any) => o.name == action.payload.name);

      if (index === -1) {
        let screen = modals.find((o: any) => o.name == action.payload.name);
        modalState.push({ ...screen, ...{ params: action.payload.params }});
      }
      else {
        delete modalState[index];
        modalState = modalState.filter((o: any) => o);
      }

      return modalState;
    },
  },
});

export const { setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
