import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    id: null,
  },
  reducers: {
    setSectionId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setSectionId } = SectionSlice.actions;
export default SectionSlice.reducer;
