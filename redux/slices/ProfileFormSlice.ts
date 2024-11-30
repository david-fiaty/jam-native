import { createSlice } from '@reduxjs/toolkit';

const ProfileFormSlice = createSlice({
  name: 'profileForm',
  initialState: {},
  reducers: {
    setProfileData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setProfileData } = ProfileFormSlice.actions;
export default ProfileFormSlice.reducer;
