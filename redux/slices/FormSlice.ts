import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    jam: {
      data: {},
      errors: [],
    }, 
    profile: {
      data: {},
      errors: [],
    },
    project: {
      data: {},
      errors: [],
    },
    signup: {
      data: {},
      errors: [],
    },
    password: {
      data: {},
      errors: [],
    },
  },
  reducers: {
    setFormData: (state: any, action: any) => {
      if (action.payload.key) {
        state[action.payload.resource].data[action.payload.key] = action.payload.value;
      }
      else if (Object.keys(action.payload.value).length > 0) {
        for (const [key, value] of Object.entries(action.payload.value)) {
          state[action.payload.resource].data[key] = value;
        }
      }
      else {
        state[action.payload.resource].data = {};
        state[action.payload.resource].errors = [];
      }
    },
    resetFormData: (state: any, action: any) => {
      state[action.payload.resource].data = {};
      state[action.payload.resource].errors = [];
    },
    setFormErrors: (state: any, action: any) => {
      state[action.payload.resource].errors = action.payload;
    },
  },
});

export const { setFormData, resetFormData, setFormErrors } = FormSlice.actions;
export default FormSlice.reducer;
