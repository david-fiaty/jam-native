import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    config: [],
    active: [],
  },
  reducers: {
    setSectionConfig: (state, action) => {
      state.config = action.payload;
    },
    setActiveSections: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveSections, setSectionConfig } = SectionSlice.actions;
export default SectionSlice.reducer;