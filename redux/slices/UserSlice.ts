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
  },
});

export const { setProfileId } = UserSlice.actions;
export default UserSlice.reducer;
