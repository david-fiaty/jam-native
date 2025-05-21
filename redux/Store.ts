import { configureStore } from '@reduxjs/toolkit';
import ModalReducer from './slices/ModalSlice';
import SearchReducer from './slices/SearchSlice';
import MessageReducer from './slices/MessageSlice';
import AppReducer from './slices/AppSlice';
import FormReducer from './slices/FormSlice';
import SectionReducer from './slices/SectionSlice';

const Store = configureStore({
  reducer: {
    modal: ModalReducer,
    search: SearchReducer,
    message: MessageReducer,
    app: AppReducer,
    form: FormReducer,
    section: SectionReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64,
      },
    })
});

export default Store;
