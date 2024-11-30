import { createSlice } from '@reduxjs/toolkit';

const JamFormSlice = createSlice({
  name: 'jamForm',
  initialState: {},
  reducers: {
    setJamData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setJamData } = JamFormSlice.actions;
export default JamFormSlice.reducer;
