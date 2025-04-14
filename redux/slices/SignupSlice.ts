import { createSlice } from '@reduxjs/toolkit';

const SignupSlice = createSlice({
  name: 'signup',
  initialState: {
    email: null,
    code: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setEmail, setCode } = SignupSlice.actions;
export default SignupSlice.reducer;
