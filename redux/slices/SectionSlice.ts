import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    sectionId: '',
    active: [],
  },
  reducers: {
    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
    setActiveSections: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setSectionId, setActiveSections } = SectionSlice.actions;
export default SectionSlice.reducer;