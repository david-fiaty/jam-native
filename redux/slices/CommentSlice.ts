import { createSlice } from '@reduxjs/toolkit';

const CommentSlice = createSlice({
  name: 'comment',
  initialState: {
    active: null,
  },
  reducers: {
    setActiveComment: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActiveComment } = CommentSlice.actions;
export default CommentSlice.reducer;
