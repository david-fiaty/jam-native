import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    sectorsData: [],
    countriesData: [],
    venueTypesData: [],
    organizationTypesData: [],
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
    setOrganizationTypesData: (state, action) => {
      state.organizationTypesData = action.payload;
    },
  },
});

export const { setSectorsData, setCountriesData, setVenueTypesData, setOrganizationTypesData } = AppSlice.actions;
export default AppSlice.reducer;
