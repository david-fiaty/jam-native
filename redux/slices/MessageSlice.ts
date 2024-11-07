import { createSlice } from '@reduxjs/toolkit';

const MessageSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setUserMessage: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUserMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
