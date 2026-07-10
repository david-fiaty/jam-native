import { createSlice } from '@reduxjs/toolkit';

const MessageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
