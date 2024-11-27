import { createSlice } from '@reduxjs/toolkit';

const AddJamSlice = createSlice({
  name: 'addJam',
  initialState: {},
  reducers: {
    setValue: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setValue } = AddJamSlice.actions;
export default AddJamSlice.reducer;
