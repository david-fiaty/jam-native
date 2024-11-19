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

  async getUserData() {
    let currentUserData: any = await DataManager.get('currentUser');
    let userJamsData: any = await DataManager.get('jams');
    let userProjectsData: any = await DataManager.get('projects');


    // Todo - Get profile data
    //let profileData = userState?.profileData || '{}';
    //return JSON.parse(profileData);

    return {};
  
  }

  isLoggedIn() {
    return Store.getState().user.isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
  }
}

export default (new UserManager());