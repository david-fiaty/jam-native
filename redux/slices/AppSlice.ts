import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    sectorsData: [],
    countriesData: [],
    venueTypesData: [],
  },
  reducers: {
    setSectorsData: (state, action) => {
      state.sectorsData = action.payload;
    },
    setCountriesData: (state, action) => {
      state.countriesData = action.payload;
    },
    setVenueTypesData: (state, action) => {
      state.venueTypesData = action.payload;
    },
  },
});

export const { setSectorsData, setCountriesData, setVenueTypesData } = AppSlice.actions;
export default AppSlice.reducer;
