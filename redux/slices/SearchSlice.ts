import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    resultIndex: [],
    defaultIndex: [],
    currentTab: null,
    currentResults: '{}',
    defaultResults: '{}',
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
    setCurrentResults: (state, action) => {
      state.currentResults = action.payload;
    },
    setDefaultResults: (state, action) => {
      state.defaultResults = action.payload;
    },
  },
});

export const { setSearchValue, setResultIndex, setDefaultIndex, setCurrentTab, setCurrentResults, setDefaultResults } = SearchSlice.actions;
export default SearchSlice.reducer;
