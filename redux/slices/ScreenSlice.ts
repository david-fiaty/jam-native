import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: {
    name: null,
    entityId: null,
  },
  reducers: {
    setActiveModal: (state, action) => {
      state.name = state.name == action.payload.name ? null : action.payload.name;
      state.entityId = action.payload?.entityId;
    },
  },
});

export const { setActiveModal } = ScreenSlice.actions;
export default ScreenSlice.reducer;
