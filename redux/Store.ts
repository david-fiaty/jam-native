import { configureStore } from '@reduxjs/toolkit';
import ScreenReducer from './slices/ScreenSlice';
import ModalReducer from './slices/ModalSlice';

const Store = configureStore({
  reducer: {
    screen: ScreenReducer,
    modal: ModalReducer,
  },
});

export default Store;
