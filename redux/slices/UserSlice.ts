import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    tokenData: {},
    profileId: 0,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
  },
});

export const { setIsLoggedIn, setTokenData, setProfileId } = UserSlice.actions;
export default UserSlice.reducer;
