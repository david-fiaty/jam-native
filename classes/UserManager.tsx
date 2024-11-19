import Store from '@/redux/Store';
import DataManager from './DataManager';
import { setTokenData, setIsLoggedIn } from '@/redux/slices/UserSlice';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });

    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setTokenData(JSON.stringify(response.tokens)));
      Store.dispatch(setIsLoggedIn(true));

      return true;
    }
    
    return false;
  }

  async signup(data: any) {
    let response = await DataManager.post('signup', data);

    if (response) {
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
  }

  getProfileData() {
    let userState = Store.getState().user;

    // Todo - Get profile data
    //let profileData = userState?.profileData || '{}';
    //return JSON.parse(profileData);

    return {};
  }
};

export default (new UserManager());