import { createSlice } from '@reduxjs/toolkit';

const ProjectFormSlice = createSlice({
  name: 'jamForm',
  initialState: {},
  reducers: {
    setProjectData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setProjectData } = ProjectFormSlice.actions;
export default ProjectFormSlice.reducer;
