import { createSlice } from '@reduxjs/toolkit';

const AddJamSlice = createSlice({
  name: 'addJam',
  initialState: {},
  reducers: {
    setValue: (state: any, action: any) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setValue } = AddJamSlice.actions;
export default AddJamSlice.reducer;
