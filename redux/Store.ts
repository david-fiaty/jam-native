import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './slices/TabSlice';
import JamReducer from './slices/JamSlice';

const Store = configureStore({
  reducer: {
    tab: TabReducer,
    jam: JamReducer,
  },
});

export default Store;
