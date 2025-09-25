import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    currentTab: null,
    currentResults: [],
    searchFilters: {},
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setCurrentResults: (state, action) => {
      state.currentResults = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = action.payload;
    },
  }, 
});

export const { setSearchValue, setSearchFilters, setCurrentTab, setCurrentResults } = SearchSlice.actions;
export default SearchSlice.reducer;
