import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    accessToken: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setIsLoggedIn, setAccessToken } = UserSlice.actions;
export default UserSlice.reducer;
