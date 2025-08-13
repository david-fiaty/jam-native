import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    sectorsData: [],
    countriesData: [],
  },
  reducers: {
    setSectorsData: (state, action) => {
      state.sectorsData = action.payload;
    },
    setCountriesData: (state, action) => {
      state.countriesData = action.payload;
    },
  },
});

export const { setSectorsData, setCountriesData } = AppSlice.actions;
export default AppSlice.reducer;
