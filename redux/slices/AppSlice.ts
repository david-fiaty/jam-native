import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    sectorsData: [],
    countriesData: [],
    venueTypesData: [],
    organizationTypesData: [],
    culturalActivityTypesData: [],
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
    setCulturalActivityTypesData: (state, action) => {
      state.culturalActivityTypesData = action.payload;
    },
  },
});

export const { setSectorsData, setCountriesData, setVenueTypesData, setOrganizationTypesData, setCulturalActivityTypesData } = AppSlice.actions;
export default AppSlice.reducer;
