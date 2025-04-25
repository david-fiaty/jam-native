import { configureStore } from '@reduxjs/toolkit';
import ModalReducer from './slices/ModalSlice';
import RouteReducer from './slices/RouteSlice';
import SearchReducer from './slices/SearchSlice';
import UserReducer from './slices/UserSlice';
import MessageReducer from './slices/MessageSlice';
import AppReducer from './slices/AppSlice';
import FormReducer from './slices/FormSlice';
import SignupReducer from './slices/SignupSlice';
import SectionReducer from './slices/SectionSlice';

const Store = configureStore({
  reducer: {
    modal: ModalReducer,
    route: RouteReducer,
    search: SearchReducer,
    user: UserReducer,
    message: MessageReducer,
    app: AppReducer,
    form: FormReducer,
    signup: SignupReducer,
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
