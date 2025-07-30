import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    currentTab: null,
    currentResults: '{}',
    defaultResults: '{}',
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
    setDefaultResults: (state, action) => {
      state.defaultResults = action.payload;
    },
  },
});

export const { setSearchValue, setCurrentTab, setCurrentResults, setDefaultResults } = SearchSlice.actions;
export default SearchSlice.reducer;
