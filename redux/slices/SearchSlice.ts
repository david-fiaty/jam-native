import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    setSearchValue: (state, action) => {
      
    },
    setSearchFilter: (state, action) => {
      
    },
  },
});

export const { setSearchValue, setSearchFilter } = SearchSlice.actions;
export default SearchSlice.reducer;
