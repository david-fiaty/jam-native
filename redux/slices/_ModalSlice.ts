import { createSlice } from '@reduxjs/toolkit';

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
      state.active = action.payload;
    },
  },
});

export const { setModalConfig, setActiveModal } = ModalSlice.actions;
export default ModalSlice.reducer;
