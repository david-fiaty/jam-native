import { createSlice } from '@reduxjs/toolkit';

const SignupSlice = createSlice({
  name: 'signup',
  initialState: {
    email: null,
    code: null,
  },
  reducers: {
    setValue: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setValue } = SignupSlice.actions;
export default SignupSlice.reducer;
