import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  tokenData: any;
  profileId: number;
  likedJams: any[];
  savedJams: any[];
  likedProjects: any[]
  savedProjects: any[],
};

const initialState: UserState = {
  isLoggedIn: false,
  tokenData: {},
  profileId: 0,
  likedJams: [],
  savedJams: [],
  likedProjects: [],
  savedProjects: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
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
    setLikedJam: (state, action) => {
      if (!state.likedJams.includes(action.payload)) {
        state.likedJams.push(action.payload);
      }
    },
    setSavedJam: (state, action) => {
      if (!state.savedJams.includes(action.payload)) {
        state.savedJams.push(action.payload);
      }
    },
    setLikedProject: (state, action) => {
      if (!state.likedProjects.includes(action.payload)) {
        state.likedProjects.push(action.payload);
      }
    },
    setSavedProject: (state, action) => {
      if (!state.savedProjects.includes(action.payload)) {
        state.savedProjects.push(action.payload);
      }
    },
  },
});

export const { setIsLoggedIn, setTokenData, setProfileId, setLikedJam, setSavedJam, setLikedProject, setSavedProject } = UserSlice.actions;
export default UserSlice.reducer;
