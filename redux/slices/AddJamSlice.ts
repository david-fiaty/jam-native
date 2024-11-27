import { createSlice } from '@reduxjs/toolkit';

const AddJamSlice = createSlice({
  name: 'addJam',
  initialState: {},
  reducers: {
    setJamData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setJamData } = AddJamSlice.actions;
export default AddJamSlice.reducer;
