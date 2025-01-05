import { createSlice } from '@reduxjs/toolkit';

const SignupFormSlice = createSlice({
  name: 'signupForm',
  initialState: {},
  reducers: {
    setSignupData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setSignupData } = SignupFormSlice.actions;
export default SignupFormSlice.reducer;
