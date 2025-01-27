import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    result: '{}',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSearchResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setSearchValue, setSearchResult } = SearchSlice.actions;
export default SearchSlice.reducer;
