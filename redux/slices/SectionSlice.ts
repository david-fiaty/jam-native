import { createSlice } from '@reduxjs/toolkit';

const SectionSlice = createSlice({
  name: 'section',
  initialState: {
    sectionId: '',
    modalId: '',
  },
  reducers: {
    setSectionId: (state, action) => {
      state.sectionId = action.payload;
    },
    setModalId: (state, action) => {
      state.modalId = action.payload;
    },
  },
});

export const { setSectionId, setModalId } = SectionSlice.actions;
export default SectionSlice.reducer;
