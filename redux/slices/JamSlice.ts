import { createSlice } from '@reduxjs/toolkit';

const JamSlice = createSlice({
  name: 'jam',
  initialState: {},
  reducers: {
    viewJammers: (state, action) => {
      
    },
  },
});

export const { viewJammers } = JamSlice.actions;
export default JamSlice.reducer;
