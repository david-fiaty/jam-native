import { createSlice } from '@reduxjs/toolkit';

const SignupSlice = createSlice({
  name: 'signup',
  initialState: {
  },
  reducers: {
    setValue: (state, action) => {
      return action.payload;
    },
  },
});

export const { setValue } = SignupSlice.actions;
export default SignupSlice.reducer;
