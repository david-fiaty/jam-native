import { configureStore } from '@reduxjs/toolkit';
import ScreenReducer from './slices/ScreenSlice';
import JamReducer from './slices/JamSlice';

const Store = configureStore({
  reducer: {
    screen: ScreenReducer,
    jam: JamReducer,
  },
});

export default Store;
