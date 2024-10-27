import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSearchFilter: (state, action) => {
      
    },
  },
});

export const { setSearchValue, setSearchFilter } = SearchSlice.actions;
export default SearchSlice.reducer;
