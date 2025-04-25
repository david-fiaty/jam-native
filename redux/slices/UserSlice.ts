import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    profileId: 0,
    likedJams: [],
    savedJams: [],
    likedProjects: [],
    savedProjects: [],
  },
  reducers: {
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

export const { setProfileId, setLikedJams, setSavedJams, setLikedProjects, setSavedProjects } = UserSlice.actions;
export default UserSlice.reducer;
