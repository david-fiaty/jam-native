import { configureStore } from '@reduxjs/toolkit';
import ScreenReducer from './slices/ScreenSlice';
import SearchReducer from './slices/SearchSlice';
import UserReducer from './slices/UserSlice';
import MessageReducer from './slices/MessageSlice';

const Store = configureStore({
  reducer: {
    screen: ScreenReducer,
    search: SearchReducer,
    user: UserReducer,
    message: MessageReducer,
  },
});

export default Store;
