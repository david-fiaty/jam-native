import { useSelector } from 'react-redux';
import { setIsLoggedIn } from '@/redux/slices/UserSlice';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });
    
    return response;
  }

  isLoggedIn () {
    const userState = useSelector((state) => state.user);
    return userState.isLoggedIn === true;
  }
};

export default (new UserManager());