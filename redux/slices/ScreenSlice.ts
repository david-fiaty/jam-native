import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: {
    name: null,
    entityId: null,
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.name = action.payload.name;
      state.entityId = action.payload?.entityId;
    },
  },
});

export const { setActiveScreen } = ScreenSlice.actions;
export default ScreenSlice.reducer;
