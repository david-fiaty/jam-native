import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    setSearchValue: (state, action) => {
      
    },
    setSearchFilter: (state, action) => {
      
    },
    setSearchResult: (state, action) => {
      
    },
  },
});

export const { setSearchResult } = SearchSlice.actions;
export default SearchSlice.reducer;
