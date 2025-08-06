import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    sectorsData: [],
  },
  reducers: {
    setSectorsData: (state, action) => {
      state.sectorsData = action.payload;
    },
  },
});

export const { setSectorsData } = AppSlice.actions;
export default AppSlice.reducer;
