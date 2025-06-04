import { createSlice } from '@reduxjs/toolkit';

const CommentSlice = createSlice({
  name: 'comment',
  initialState: {

  },
  reducers: {
    setComment: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setComment } = CommentSlice.actions;
export default CommentSlice.reducer;
