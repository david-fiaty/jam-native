import { configureStore } from '@reduxjs/toolkit';
import TabReducer from './slices/TabSlice';
import ModalReducer from './slices/ModalSlice';

const Store = configureStore({
  reducer: {
    tab: TabReducer,
    cart: ModalReducer,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
