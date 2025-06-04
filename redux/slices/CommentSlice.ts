import { createSlice } from '@reduxjs/toolkit';

const CommentSlice = createSlice({
  name: 'comment',
  initialState: {},
  reducers: {
    setActiveComment: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveComment } = CommentSlice.actions;
export default CommentSlice.reducer;
