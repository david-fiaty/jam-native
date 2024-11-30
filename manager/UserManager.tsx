import { setTokenData, setIsLoggedIn } from '@/redux/slices/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import DeviceManager from './DeviceManager';

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
    let profileId: number = Store.getState().user.profileId;
    if (profileId === 0) {
      let userAccount: any = await DataManager.get('currentUser');
      profileId = parseInt(userAccount?.user?.profiles?.[0]?.id || 0);
    }

    return profileId;
  }

  async setLanguage(languageCode: string) {
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
    } catch (error) {
      console.log(error);
    }
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