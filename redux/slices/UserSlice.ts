import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    accessToken: {},
    accountData: {},
    profileData: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAccountData: (state, action) => {
      state.accountData = action.payload;
    },
  },
});

export const { setIsLoggedIn, setAccessToken, setAccountData } = UserSlice.actions;
export default UserSlice.reducer;
