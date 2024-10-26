import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    setSearchResult: (state, action) => {
      
    },
  },
});

export const { setSearchResult } = SearchSlice.actions;
export default SearchSlice.reducer;
