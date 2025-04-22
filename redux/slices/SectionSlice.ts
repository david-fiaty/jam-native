import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    active: [],
  },
  reducers: {
    setActiveSections: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveSections } = SectionSlice.actions;
export default SectionSlice.reducer;
