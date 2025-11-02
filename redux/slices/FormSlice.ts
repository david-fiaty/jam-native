import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    jam: {}, 
    profile: {},
    project: {},
    login: {},
    signup: {},
    password: {},
    comment: {},
    errors: [],
  },
  reducers: {
    setFormData: (state: any, action: any) => {
      state[action.payload.resource] = action.payload.value;
    },
    setFormErrors: (state: any, action: any) => {
      state.errors = action.payload;
    },
  },
});

export const { setFormData, setFormErrors } = FormSlice.actions;
export default FormSlice.reducer;
