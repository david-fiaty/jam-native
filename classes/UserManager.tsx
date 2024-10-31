import Store from '@/redux/Store';
import { setIsLoggedIn, setAccessToken } from '@/redux/slices/UserSlice';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });
    
    return response;
  }
};

export default (new UserManager());