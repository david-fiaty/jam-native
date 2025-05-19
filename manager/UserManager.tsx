import { Platform } from 'react-native';
import { setLikedJams, setSavedJams, setLikedProjects, setSavedProjects } from '@/redux/slices/UserSlice';
import { setActiveModals } from '@/redux/slices/ModalSlice';
import { setActiveSections } from '@/redux/slices/SectionSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from '@/redux/Store';
import SessionManager from './SessionManager';
import DataManager from './DataManager';
import * as Location from 'expo-location';
import * as Device from "expo-device";
import i18n from '@/translation/i18n';

class UserManager {
  async sendSignupCode(data: any) {
    let response = await DataManager.post('sendSignupCode', data);
    let success: boolean = false;

    if (response?.session?.length > 0) success = true;

    return {
      success: success,
      response: response,
    };
  }

  async verifySignupCode(data: any) {
    let response = await DataManager.post('verifySignupCode', data);
    
    return response;
  }

  async login(data: any) {
    let response = await DataManager.post('login', data);
    if (response?.tokens?.access_token?.length) {
      await SessionManager.setTokenData(response.tokens);
    }
    
    return response;
  }

  async register(data: any) {
    let response = await DataManager.post('register', data);
    let success = response?.tokens?.access_token?.length > 0;

    if (success) {
      await SessionManager.setTokenData(response.tokens);
    }

    return {
      success: success,
      data: response,
    }
  }

  async isLoggedIn() {
    return await SessionManager.isTokenValid();
  }

  logout() {
    SessionManager.setTokenData({});
    Store.dispatch(setActiveModals([]));
    Store.dispatch(setActiveSections([]));
  }

  async getUserData() { 
    return await DataManager.get('currentUser');
  }

  async changePassword(data: any) { 
    let response: any = await DataManager.put('changePassword', data); 
    let success: boolean = false;

    return {
      success: success,
      response: response,
    };
  }

  async getProfileId() {
    let profileId: number = Store.getState()?.user?.profileId || 0;

    if (profileId === 0) {
      let userAccount: any = await DataManager.get('currentUser');
      profileId = parseInt(userAccount?.profiles?.[0]?.id || 0);
    }

    return profileId;
  }

  async getProfileData(options?: any) {
    options = options || {};
    let profileId: number = await this.getProfileId();
    let defaults = {};
    let profileData = [];
    let variables: any = { '[profile_id]': profileId };

    if (profileId > 0) {
      profileData = await DataManager.get('getProfile', {...defaults, ...options}, variables);
    }

    return profileData || {};
  }

  async updateProfile(data: any) {
    let defaults: any = {};
    let profileId: number = await this.getProfileId();
    let variables: any = { '[profile_id]': profileId };

    return await DataManager.put('updateProfile', {...defaults, ...data}, variables); 
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

  async setLanguage(languageCode: string) {
    let storageKey: string = 'language';
    
    if (Platform.OS === 'web') {
      localStorage.setItem(storageKey, languageCode);
    } 
    else {
      await AsyncStorage.setItem(storageKey, languageCode);
    }
  }

  async getLanguage() {
    try {
      let storageKey: string = 'language';
      let language = Platform.OS === 'web' ? localStorage.getItem(storageKey) : await AsyncStorage.getItem(storageKey);

      return language || Config.fallbackLanguage;
    }
    catch (error) {
      console.log(error);
      return Config.fallbackLanguage;
    }
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