import { createSlice } from '@reduxjs/toolkit';

const MessageSlice = createSlice({
  name: 'message',
  initialState: {
    text: '',
  },
  reducers: {
    setMessage: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
