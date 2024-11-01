import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfileData } = ProfileSlice.actions;
export default ProfileSlice.reducer;
