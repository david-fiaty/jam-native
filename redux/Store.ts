import { configureStore } from '@reduxjs/toolkit';
import ScreenReducer from './slices/ScreenSlice';
import SearchReducer from './slices/SearchSlice';
import UserReducer from './slices/UserSlice';

const Store = configureStore({
  reducer: {
    screen: ScreenReducer,
    search: SearchReducer,
    user: UserReducer,
  },
});

export default Store;
