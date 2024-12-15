import { createSlice } from '@reduxjs/toolkit';

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
    expanded: false,
    run: false,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
    setRunSearch: (state, action) => {
      state.run = action.payload;
    },
    toggleSearchField: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { setSearchValue, setRunSearch, toggleSearchField } = SearchSlice.actions;
export default SearchSlice.reducer;
