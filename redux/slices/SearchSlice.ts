import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    resultIndex: [],
    defaultIndex: [],
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
  },
});

export const { setSearchValue, setResultIndex, setDefaultIndex } = SearchSlice.actions;
export default SearchSlice.reducer;
