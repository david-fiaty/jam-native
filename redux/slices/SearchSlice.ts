import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    resultIndex: [],
    defaultIndex: [],
    currentTab: null,
    searchResults: [],
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setResultIndex: (state, action) => {
      state.resultIndex = action.payload;
    },
    setDefaultIndex: (state, action) => {
      state.defaultIndex = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchValue, setResultIndex, setDefaultIndex, setCurrentTab, setSearchResults } = SearchSlice.actions;
export default SearchSlice.reducer;
