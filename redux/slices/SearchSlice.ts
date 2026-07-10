import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    currentTab: null,
    tabResults: {},
    searchFilters: {},
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setTabResults: (state, action) => {
      state.tabResults = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = action.payload;
    },
  }, 
});

export const { setSearchValue, setSearchFilters, setCurrentTab, setTabResults } = SearchSlice.actions;
export default SearchSlice.reducer;
