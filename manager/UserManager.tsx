import { setTokenData, setIsLoggedIn } from '@/redux/slices/UserSlice';
import { setLanguage } from '@/redux/slices/AppSlice';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import DeviceManager from './DeviceManager';

class UserManager {
  async login(data: any) {
    let response = await DataManager.post('login', data);
    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setTokenData(JSON.stringify(response.tokens)));
      Store.dispatch(setIsLoggedIn(true));
    }
    
    return response;
  }

  logout() {
    Store.dispatch(setTokenData('{}'));
    Store.dispatch(setIsLoggedIn(false));

    // Todo - Also reset active screen to avoid redirect on relogin
  }

  async register(data: any) {
    let response = await DataManager.post('register', data);
    if (response?.tokens?.access_token?.length) {
      Store.dispatch(setTokenData(JSON.stringify(response.tokens)));
      Store.dispatch(setIsLoggedIn(true));
    }
    
    return response;
  }

  async getUserData() { 
    return await DataManager.get('currentUser');
  }

  async changePassword(data: any) { 
    return await DataManager.put('changePassword', data);
  }

  async getProfileId() {
    let profileId: number = Store.getState().user.profileId;
    if (profileId === 0) {
      let userAccount: any = await DataManager.get('currentUser');
      profileId = parseInt(userAccount?.profiles?.[0]?.id || 0);
    }

    return profileId;
  }

  async getProfileData(options?: any) {
    let profileId: number = await this.getProfileId();
    let defaults = {};
    let profileData = [];
    let variables: any = { '[profile_id]': profileId };

    if (profileId > 0) {
      profileData = await DataManager.get('getProfile', {...defaults, ...options}, variables);
    }

    return profileData || {};
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
      userNotifications = await DataManager.get('notifications', {...defaults, ...options}, 
        {'[profile_id]': profileId},
      );
    }

    return userNotifications || [];
  }

  async isJamOwner(entityId: number) {
    let profileData: any = await this.getProfileData();
    let profileJams: any = profileData?.profile_jams || [];

    return profileJams.includes(entityId);
  }
  
  async isProjectOwner(entityId: number) {
    let profileData: any = await this.getProfileData();
    let profileProjects: any = profileData?.profile_projects || [];

    return profileProjects.includes(entityId);
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
  }
}

export default (new UserManager());