import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    accessToken: {},
    profileData: {},
    profileData: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setIsLoggedIn, setAccessToken, setProfileData } = UserSlice.actions;
export default UserSlice.reducer;
