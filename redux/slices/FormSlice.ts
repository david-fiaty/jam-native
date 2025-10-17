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
      if (action.payload.key) {
        state[action.payload.resource][action.payload.key] = action.payload.value;
      }
      else if (Object.keys(action.payload.value).length > 0) {
        for (const [key, value] of Object.entries(action.payload.value)) {
          state[action.payload.resource][key] = value;
        }
      }
      else {
        state[action.payload.resource] = {};
      }
    },
    setFormErrors: (state: any, action: any) => {
      state.errors = action.payload;
    },
  },
});

export const { setFormData, setFormErrors } = FormSlice.actions;
export default FormSlice.reducer;
