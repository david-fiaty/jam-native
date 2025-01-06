import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {},
  reducers: {
    setFormData: (state: any, action: any) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFormData } = FormSlice.actions;
export default FormSlice.reducer;
