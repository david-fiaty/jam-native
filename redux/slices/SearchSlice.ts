import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    currentTab: null,
    currentPage: 1,
    currentResults: '{}',
    defaultResults: '{}',
    searchFilters: {},
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentResults: (state, action) => {
      state.currentResults = action.payload;
    },
    setDefaultResults: (state, action) => {
      state.defaultResults = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = action.payload;
    },
  },
});

export const { setSearchValue, setSearchFilters, setCurrentTab, setCurrentPage, setCurrentResults, setDefaultResults } = SearchSlice.actions;
export default SearchSlice.reducer;
