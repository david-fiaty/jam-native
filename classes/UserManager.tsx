import { useSelector } from 'react-redux';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string, userState?: object) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });
    
    return response;
  }

  isLoggedIn() {
    return (useSelector((state) => state.user)).isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
    console.log(useSelector((state) => state.user));
  }
};

export default (new UserManager());