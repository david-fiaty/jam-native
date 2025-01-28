import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    current: '{}',
    default: '{}',
  },
  reducers: {
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

export const { setSearchValue, setDefaultResult, setCurrentResult } = SearchSlice.actions;
export default SearchSlice.reducer;
