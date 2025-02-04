import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    tokenData: {},
    profileId: 0,
    likedJams: [],
    savedJams: [],
    likedProjects: [],
    savedProjects: [],
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = parseInt(action.payload || 0);
    },
    setLikedJams: (state, action) => {
      state.likedJams = action.payload;
    },
    setSavedJams: (state, action) => {
      state.savedJams = action.payload;
    },
    setLikedProjects: (state, action) => {
      state.likedProjects = action.payload;
    },
    setSavedProjects: (state, action) => {
      state.savedJams = action.payload;
    },
  },
});

export const { setIsLoggedIn, setTokenData, setProfileId, setLikedJams, setSavedJams, setLikedProjects, setSavedProjects } = UserSlice.actions;
export default UserSlice.reducer;
