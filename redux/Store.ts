import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './slices/ScreenSlice';
import JamReducer from './slices/JamSlice';

const Store = configureStore({
  reducer: {
    tab: TabReducer,
    jam: JamReducer,
  },
});

export default Store;
