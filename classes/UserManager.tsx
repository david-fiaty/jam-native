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
    return (useSelector((state: any) => state.user)).isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
    console.log(useSelector((state: any) => state.user));
  }

  getAccountData() {
    let userState = useSelector((state: any) => state.user);
    let accountData = userState?.accountData || '{}';

    return JSON.parse(accountData);
  }
};

export default (new UserManager());