import { createSlice } from '@reduxjs/toolkit';

const CommentSlice = createSlice({
  name: 'comment',
  initialState: {
    active: null,
  },
  reducers: {
    setComment: (state, action) => {
      return action.payload;
    },
  },
});

export const { setComment } = CommentSlice.actions;
export default CommentSlice.reducer;
