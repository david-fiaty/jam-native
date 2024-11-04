import { createSlice } from '@reduxjs/toolkit';

const ScreenSlice = createSlice({
  name: 'screen',
  initialState: {
    name: '',
    entityId: 0,
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
