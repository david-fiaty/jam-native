import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './slices/ScreenSlice';
import ModalReducer from './slices/ModalSlice';

const Store = configureStore({
  reducer: {
    tab: TabReducer,
    modal: ModalReducer,
  },
});

export default Store;
