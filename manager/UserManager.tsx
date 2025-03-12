import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocales } from 'expo-localization';
import { setLikedJams, setSavedJams, setLikedProjects, setSavedProjects } from '@/redux/slices/UserSlice';
import { setLanguage } from '@/redux/slices/AppSlice';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import * as Location from 'expo-location';
import * as Device from "expo-device";
import i18n from '@/translation/i18n';

class UserManager {
  getTokenStorageKey() {
    return `${Config.storageKey}:tokens`;
  }

  async login(data: any) {
    let response = await DataManager.post('login', data);
    if (response?.tokens?.access_token?.length) {
      await this.setTokenData(response.tokens);
    }
    
    return response;
  }

  async register(data: any) {
    let response = await DataManager.post('register', data);
    if (response?.tokens?.access_token?.length) {
      await this.setTokenData(response.tokens);
    }
    
    return response;
  }

  async isTokenValid() {
    let data: any = await this.getTokenData();
    let exists: boolean = data?.access_token?.length > 0;
    let valid: boolean = data?.access_token_exp && data.access_token_exp > Date.now();

    return exists && valid;
  }

  async isLoggedIn() {
    return await this.isTokenValid();
  }

  async setTokenData(data: any) {
    try {
      let storageKey: string = this.getTokenStorageKey();
      let json: string = JSON.stringify(data);

      return await AsyncStorage.setItem(storageKey, json);
    } catch (error) {
      console.log(error);
    }
  }

  async getTokenData() {
    try {
      let storageKey: string = this.getTokenStorageKey();
      let json: any = AsyncStorage.getItem(storageKey) || '{}';

      return await JSON.parse(json); 
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.setTokenData({});
    // Todo - Also reset active screen to avoid redirect on relogin
  }

  async getUserData() { 
    return await DataManager.get('currentUser');
  }

  async changePassword(data: any) { 
    return await DataManager.put('changePassword', data);
  }

  async getProfileId() {
    let profileId: number = Store.getState()?.user?.profileId;
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

  async getLocation() {
    if (Platform.OS === "android" && !Device.isDevice) {
      console.log(i18n.t("Location features are not available for virtual devices"));
      return null;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      // Todo - Handle location permission error display
      return null;
    }

    let location: any = await Location.getCurrentPositionAsync({});

    if (location) {
      location = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
    else {
      location = {
        latitude: Config.defaultLocation.latitude,
        longitude: Config.defaultLocation.longitude,
      };
    }

    return location;
  }

  getLanguage() {
    let userLanguage: string = Store.getState().app.language;
    let locales = useLocales();

    if (Array.isArray(locales) && locales.length > 0) {
      return locales[0].languageCode; 
    }
  
    return userLanguage || Config.fallbackLanguage;
  };

  async updateLikedJams(entityId: number) {
    let likedJams: any[] = [...Store.getState()?.user?.likedJams];
    
    if (likedJams.includes(entityId)) likedJams = likedJams.filter((v: any) => v !== entityId)
    else likedJams.push(entityId);

    Store.dispatch(setLikedJams(likedJams));
  }

  async updateSavedJams(entityId: number) {
    let savedJams: any[] = [...Store.getState()?.user?.savedJams];
    
    if (savedJams.includes(entityId)) savedJams = savedJams.filter((v: any) => v !== entityId)
    else savedJams.push(entityId);

    Store.dispatch(setSavedJams(savedJams));
  }

  async updateLikedProjects(entityId: number) {
    let likedProjects: any[] = [...Store.getState()?.user?.likedProjects];
    
    if (likedProjects.includes(entityId)) likedProjects = likedProjects.filter((v: any) => v !== entityId)
    else likedProjects.push(entityId);

    Store.dispatch(setLikedProjects(likedProjects));
  }

  async updateSavedProjects(entityId: number) {
    let savedProjects: any[] = [...Store.getState()?.user?.savedProjects];
    
    if (savedProjects.includes(entityId)) savedProjects = savedProjects.filter((v: any) => v !== entityId)
    else savedProjects.push(entityId);

    Store.dispatch(setSavedProjects(savedProjects));
  }
}

export default (new UserManager());