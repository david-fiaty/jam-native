import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    result: {},
    expanded: false,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSearchResult: (state, action) => {
      state.value = action.payload;
    },
    toggleSearchField: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { setSearchValue, setSearchResult, toggleSearchField } = SearchSlice.actions;
export default SearchSlice.reducer;
