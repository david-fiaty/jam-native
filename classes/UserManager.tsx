import Store from '@/redux/Store';
import DataManager from './DataManager';
import { setAccessToken, setAccountData, setIsLoggedIn } from '@/redux/slices/UserSlice';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });

    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setAccessToken(JSON.stringify(response.tokens)));
      Store.dispatch(setAccountData(JSON.stringify(response.user)));
      Store.dispatch(setIsLoggedIn(JSON.stringify(true)));

      return true;
    }
    
    return false;
  }

  isLoggedIn() {
    return Store.getState().user.isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
    console.log(Store.getState().user);
  }
};

export default (new UserManager());