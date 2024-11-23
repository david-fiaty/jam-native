import { setTokenData, setIsLoggedIn } from '@/redux/slices/UserSlice';
import Store from '@/redux/Store';
import DataManager from './DataManager';

class UserManager {
  async login(data: any) {
    let response = await DataManager.post('login', data);
    
    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setTokenData(JSON.stringify(response.tokens)));
      Store.dispatch(setIsLoggedIn(true));

      return true;
    }
    
    return false;
  }

  async register(data: any) {
    let response = await DataManager.post('register', data);

    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setTokenData(JSON.stringify(response.tokens)));
      Store.dispatch(setIsLoggedIn(true));

      return true;
    }
    
    return false;
  }

  async getUserData() {
    let userAccount: any = await DataManager.get('currentUser');
    let userJams: any = await DataManager.get('jams');
    let userProjects: any = await DataManager.get('projects');

    return {
      account: userAccount?.user,
      jams: userJams,
      projects: userProjects,
    };
  }

  async getProfileId() {
    let profileId: any = Store.getState().user.profileId;
    if (profileId === 0) {
      let userAccount: any = await DataManager.get('currentUser');
      profileId = parseInt(userAccount?.user?.id || 0);
    }

    return profileId;
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