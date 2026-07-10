import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    tokenData: {},
    currentLanguage: 'en',
    profileData: {},
  },
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setTokenData, setCurrentLanguage, setProfileData } = UserSlice.actions;
export default UserSlice.reducer;
