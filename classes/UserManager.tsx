import { useSelector } from 'react-redux';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });

    this.isAccessTokenValid();
    
    return response;
  }

  isLoggedIn() {
    return (useSelector((state) => state.user)).isLoggedIn === true;
  }

  isAccessTokenValid() {
    const userState = useSelector((state) => state.user);
    console.log('---oooppp---');
    console.log(userState);
  }
};

export default (new UserManager());