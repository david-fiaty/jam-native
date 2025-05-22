import { Platform } from 'react-native';
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
import i18next from 'i18next';

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
    let userAccount: any = await DataManager.get('currentUser');
    let profileId: number = parseInt(userAccount?.profiles?.[0]?.id || 0);

    return profileId;
  }

  async getProfileData(options?: any) {
    options = options || {};
    let profileId: number = await this.getProfileId();
    let defaults: any = {};
    let profileData: any = {};
    let localProfileData: any = null;
    let variables: any = { '[profile_id]': profileId };

    if (profileId > 0) {
      profileData = await DataManager.get('getProfile', { ...defaults, ...options }, variables);
    }

    if (Platform.OS === 'web') localProfileData = localStorage.getItem(Config.storageKeys.profileData)
    else localProfileData = await AsyncStorage.getItem(Config.storageKeys.profileData);

    return {
      ...(profileData || {}),
      ...(localProfileData || {}),
    };
  }

  async updateProfile(data: any) {
    let defaults: any = {};
    let profileId: number = await this.getProfileId();
    let variables: any = { '[profile_id]': profileId };

    return await DataManager.put('updateProfile', { ...defaults, ...data }, variables);
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
      userNotifications = await DataManager.get('notifications', { ...defaults, ...options },
        { '[profile_id]': profileId },
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
    if (Platform.OS === 'web') {
      localStorage.setItem(Config.storageKeys.currentLanguage, languageCode);
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.currentLanguage, languageCode);
    }

    i18next.changeLanguage(languageCode);
  }

  async getLanguage() {
    try {
      let language = Platform.OS === 'web'
        ? localStorage.getItem(Config.storageKeys.currentLanguage)
        : await AsyncStorage.getItem(Config.storageKeys.currentLanguage);

      return language || Config.fallbackLanguage;
    }
    catch (error) {
      console.log(error);

      return Config.fallbackLanguage;
    }
  };

  async likeJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Like Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response = await DataManager.post('likeJam', {
      profile_id: profileData.id,
      item_id: entityId,
      like_action: 'like',
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The Jam was liked.');

      this.updateLocalProfileReference('liked_jams', 'add', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async unlikeJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Unlike Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response = await DataManager.post('likeJam', {
      profile_id: profileData.id,
      item_id: entityId,
      like_action: 'unlike',
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The Jam was unliked.');
      
      this.updateLocalProfileReference('liked_jams', 'delete', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async saveJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Save Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response = await DataManager.post('saveJam', {
      profile_id: profileData.id,
      save_items_ids: [entityId],
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The Jam was saved.');

      this.updateLocalProfileReference('saved_jams', 'add', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async unsaveJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let localProfileData: any = {};
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Unsave Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response = await DataManager.post('unsaveJam', {
      profile_id: profileData.id,
      unsave_items_ids: [entityId],
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The Jam was unsaved.');

      this.updateLocalProfileReference('saved_jams', 'delete', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async updateLocalProfileReference (key: string, action: string, value: any) {
    let localProfileData: any = '{}';
    let references = [];

    if (Platform.OS === 'web') {
      localProfileData = localStorage.getItem(Config.storageKeys.profileData) || '{}';
    }
    else {
      localProfileData = (await AsyncStorage.getItem(Config.storageKeys.profileData)) || '{}';
    }

    localProfileData = JSON.parse(localProfileData);

    if (action == 'add') {
      references = [...new Set([...localProfileData?.[key] || [], value])];
    }
    else if (action == 'delete') {
      references = [...localProfileData?.[key] || []].filter((v: any) => v == value);
    } 

    localProfileData = {
      ...localProfileData,
      ...{ [key]: references },
    };

    localProfileData = JSON.stringify(localProfileData);

    if (Platform.OS === 'web') {
      localStorage.setItem(Config.storageKeys.profileData, localProfileData);
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.profileData, localProfileData);
    }
  }
}

export default (new UserManager());