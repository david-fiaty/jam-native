import { createSlice } from '@reduxjs/toolkit';

const RouteSlice = createSlice({
  name: 'route',
  initialState: {
    config: [],
    active: [],
  },
  reducers: {
    setRouteConfig: (state, action) => {
      state.config = action.payload;
    },
    setActiveRoute: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setRouteConfig, setActiveRoute } = RouteSlice.actions;
export default RouteSlice.reducer;
