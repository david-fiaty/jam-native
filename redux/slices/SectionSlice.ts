import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    sectionId: '',
  },
  reducers: {
    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
  },
});

export const { setSectionId } = SectionSlice.actions;
export default SectionSlice.reducer;
