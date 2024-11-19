import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    tokenData: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
  },
});

export const { setIsLoggedIn, setTokenData } = UserSlice.actions;
export default UserSlice.reducer;
