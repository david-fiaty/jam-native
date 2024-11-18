import { useSelector } from 'react-redux';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import { setAccessToken, setProfileData, setIsLoggedIn } from '@/redux/slices/UserSlice';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });

    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setAccessToken(JSON.stringify(response.tokens)));
      Store.dispatch(setProfileData(JSON.stringify(response.user)));
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
    return (useSelector((state: any) => state.user)).isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
    console.log(useSelector((state: any) => state.user));
  }

  getProfileData() {
    let userState = useSelector((state: any) => state.user);
    let profileData = userState?.profileData || '{}';

    return JSON.parse(profileData);
  }
};

export default (new UserManager());