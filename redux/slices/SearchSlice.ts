import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    resultIndex: [],
    defaultIndex: [],
    currentTab: null,
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
  },
});

export const { setSearchValue, setResultIndex, setDefaultIndex, setCurrentTab } = SearchSlice.actions;
export default SearchSlice.reducer;
