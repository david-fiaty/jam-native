import { setTokenData, setIsLoggedIn } from '@/redux/slices/UserSlice';
import { setLanguage } from '@/redux/slices/AppSlice';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import DeviceManager from './DeviceManager';
import { Config } from '@/constants/Config';

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
    let userJams: any = await DataManager.get('listJams'); // Todo - Remove for better perf
    let userProjects: any = await DataManager.get('listProjects');

    return {
      account: userAccount?.user,
      jams: userJams,
      projects: userProjects,
    };
  }

  async getProfileId() {
    let profileId: number = Store.getState().user.profileId;
    if (profileId === 0) {
      let userAccount: any = await DataManager.get('currentUser');
      profileId = parseInt(userAccount?.user?.profiles?.[0]?.id || 0);
    }

    return profileId;
  }

  async getNotifications(options?: any) {
    options = options || {};
    let userNotifications: any = [];
    let profileId: number = await this.getProfileId();

    let defaults: any = {
      displayed_items_ids: [64, 65], // Todo - What is this required param
      nbr_items_to_return: Config.paginationSize,
    };


    if (profileId > 0) {
      let variables: any = {
        'profile_id': profileId,
      };
      
      userNotifications = await DataManager.get('notifications', {...defaults, ...options}, variables);
    }

    return userNotifications || [];
  }

  setLanguage(languageCode: string) {
    Store.dispatch(setLanguage(languageCode));
  }

  getLanguage() {
    let userLanguage: string = Store.getState().app.language;
    let deviceLanguage: any = DeviceManager.getLanguage();

    return userLanguage || deviceLanguage;
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