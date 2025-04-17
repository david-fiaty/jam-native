import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  return {
    email: null,
    session: null,
    code: null,
    success: false,
  };
}

const SignupSlice = createSlice({
  name: 'signup',
  initialState: getInitialState(),
  reducers: {
    setValue: (state, action) => {
      if (action.payload) {
        state[action.payload.key] = action.payload.value;
      }
      else {
        return getInitialState();
      }
    },
  },
});

export const { setValue } = SignupSlice.actions;
export default SignupSlice.reducer;
