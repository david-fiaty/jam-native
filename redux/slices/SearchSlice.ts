import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    filter: '',
    expanded: false,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleSearchField: (state, action) => {
      state.expanded = !action.payload;
    },
  },
});

export const { setSearchValue, setSearchFilter, toggleSearchField } = SearchSlice.actions;
export default SearchSlice.reducer;
