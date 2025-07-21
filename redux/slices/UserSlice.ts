import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    tokenData: {},
    currentLanguage: 'en',
  },
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setTokenData, setCurrentLanguage } = UserSlice.actions;
export default UserSlice.reducer;
