import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searching: false,
    value: '',
    current: '{}',
    default: '{}',
  },
  reducers: {
    setIsSearching: (state, action) => {
      state.searching = action.payload;
    },
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setCurrentResult: (state, action) => {
      state.current = action.payload;
    },
    setDefaultResult: (state, action) => {
      state.default = action.payload;
    },
  },
});

export const { setIsSearching, setSearchValue, setDefaultResult, setCurrentResult } = SearchSlice.actions;
export default SearchSlice.reducer;
