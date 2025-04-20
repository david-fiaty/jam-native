import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
  },
  reducers: {
    setSection: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSection } = SectionSlice.actions;
export default SectionSlice.reducer;
