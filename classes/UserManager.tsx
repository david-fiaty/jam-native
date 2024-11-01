import { useSelector } from 'react-redux';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });
    
    return response;
  }

  isLoggedIn() {
    return (useSelector((state) => state.user)).isLoggedIn === true;
  }
};

export default (new UserManager());