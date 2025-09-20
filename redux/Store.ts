import { configureStore } from '@reduxjs/toolkit';
import AppReducer from './slices/AppSlice';
import ModalReducer from './slices/ModalSlice';
import SearchReducer from './slices/SearchSlice';
import MessageReducer from './slices/MessageSlice';
import UserReducer from './slices/UserSlice';
import FormReducer from './slices/FormSlice';
import SectionReducer from './slices/SectionSlice';
import CommentReducer from './slices/CommentSlice';
import ScreenReducer from './slices/ScreenSlice';

const Store = configureStore({
  reducer: {
    app: AppReducer,
    modal: ModalReducer,
    search: SearchReducer,
    message: MessageReducer,
    user: UserReducer,
    form: FormReducer,
    section: SectionReducer,
    comment: CommentReducer,
    screen: ScreenReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64,
      },
    })
});

export default Store;
