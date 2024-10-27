import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    filter: '',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearchValue, setSearchFilter } = SearchSlice.actions;
export default SearchSlice.reducer;
