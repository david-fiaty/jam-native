import { configureStore } from '@reduxjs/toolkit';
import ScreenReducer from './slices/ScreenSlice';
import SearchReducer from './slices/SearchSlice';
import UserReducer from './slices/UserSlice';
import MessageReducer from './slices/MessageSlice';
import AppReducer from './slices/AppSlice';
import ProjectFormReducer from './slices/ProjectFormSlice';
import SignupFormReducer from './slices/SignupFormSlice';
import FormReducer from './slices/FormSlice';

const Store = configureStore({
  reducer: {
    screen: ScreenReducer,
    search: SearchReducer,
    user: UserReducer,
    message: MessageReducer,
    app: AppReducer,
    form: FormReducer,
    projectForm: ProjectFormReducer, 
    signupForm: SignupFormReducer,
  },
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'production' ? getDefaultMiddleware() : getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64,
      },
    })
});

export default Store;
