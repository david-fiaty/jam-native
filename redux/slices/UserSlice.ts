import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    tokenData: {},
  },
  reducers: {
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
  },
});

export const { setTokenData } = UserSlice.actions;
export default UserSlice.reducer;
