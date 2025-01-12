import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    jam: {}, 
    profile: {},
    project: {},
    signup: {},
    account: {},
  },
  reducers: {
    setFormData: (state: any, action: any) => {
      if (action.payload.key) {
        state[action.payload.resource][action.payload.key] = action.payload.value;
      }
      else if (action.payload.value) {
        for (const [key, value] of Object.entries(action.payload.value)) {
          state[action.payload.resource][key] = value;
        }
      }
      else {
        state[action.payload.resource] = {};
      }
    },
  },
});

export const { setFormData } = FormSlice.actions;
export default FormSlice.reducer;
