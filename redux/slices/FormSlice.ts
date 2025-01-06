import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    jam: {},
    profile: {},
    project: {},
    signup: {},
  },
  reducers: {
    setFormData: (state: any, action: any) => {
      state[action.payload.resource][action.payload.key] = action.payload.value;
    },
  },
});

export const { setFormData } = FormSlice.actions;
export default FormSlice.reducer;
