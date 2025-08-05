import { setActiveModals } from '@/redux/slices/ModalSlice';
import { setActiveSections } from '@/redux/slices/SectionSlice';
import { setProfileData } from '@/redux/slices/UserSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from '@/redux/Store';
import SessionManager from './SessionManager';
import DataManager from './DataManager';
import * as Location from 'expo-location';
import * as Device from "expo-device";
import i18n from '@/translation/i18n';
import ScreenManager from './ScreenManager';
import StaticData from '@/constants/StaticData';

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
    let success = response?.tokens?.access_token?.length > 0;

    if (success) {
      SessionManager.setTokenData(response.tokens);
    }

    return {
      success: success,
      data: response,
    };
  }

  async register(data: any) {
    let response: any = await DataManager.post('register', data);
    let success: boolean = response?.tokens?.access_token?.length > 0;
    let message: string = '';

    if (success) {
      SessionManager.setTokenData(response.tokens);
    }
    else if (response?.non_field_errors?.length > 0) {
      message = response.non_field_errors[0];
    }
    else {
      message = i18n.t('Invalid data submission.');
    }

    return {
      success: success,
      data: response,
      message: message,
    };
  }

  async updateProfile(data: any) {
    let defaults: any = {};
    let profileId: number = await this.getProfileId();
    let variables: any = { '[profile_id]': profileId };
    let success: boolean = false;

    let response: any = await DataManager.put('updateProfile', { ...defaults, ...data }, variables);

    if (response?.id > 0) success = true;

    return {
      success: success,
      data: response,
    };
  }

  async isLoggedIn() {
    return Object.keys(SessionManager.getTokenData()).length > 0;
  }

  logout() {
    SessionManager.setTokenData({});
    Store.dispatch(setActiveModals([]));
    Store.dispatch(setActiveSections([]));
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

  getProfileTypeLabel(profileType: string) {
    let label: any = '';

    if (profileType?.length > 0) {
      label = (StaticData.profileTypes.find((o: any) => o.id === profileType))?.label;
    }

    return label?.length > 0 ? label: i18n.t('Unavailable');
  }

  getProfileDisplayName(item: any) {
    let displayName: string = '';

    if (item?.profile_type == 'personal') {
      displayName = `${item?.profile_personal?.first_name || ''} ${item?.profile_personal?.last_name || ''}`
    }
    else if (item?.profile_type == 'venue') {
      displayName = item?.profile_venue?.venue_name;
    }
    else if (item?.profile_type == 'organization') {
      displayName = item?.profile_organization?.organization_name;
    }

    return displayName.trim().length > 0 ? displayName : item?.profile_name;
  }

  async getProfileData(params?: any, options?: any) {
    options = options || {};
    let profileId: number = !params?.profile_id?.length ? await this.getProfileId() : params.profile_id;
    let variables: any = { '[profile_id]': profileId };
    let defaults: any = {};
    let profileData: any = {};
    let localProfileData: any = null;
    
    if (profileId > 0) {
      profileData = await DataManager.get('getProfile', { ...defaults, ...options }, variables);
    }

    if (ScreenManager.isWeb()) localProfileData = localStorage.getItem(Config.storageKeys.profileData)
    else localProfileData = await AsyncStorage.getItem(Config.storageKeys.profileData);

    return {
      ...(profileData || {}),
      ...(localProfileData || {}),
    };
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
    if (ScreenManager.isAndroid() && !Device.isDevice) {
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

    if (ScreenManager.isWeb()) {
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
      references = [...localProfileData?.[key] || []].filter((v: any) => v != value);
    } 

    localProfileData = {
      ...localProfileData,
      ...{ [key]: references },
    };

    localProfileData = JSON.stringify(localProfileData);

    if (ScreenManager.isWeb()) {
      localStorage.setItem(Config.storageKeys.profileData, localProfileData);
    }
    else {
      await AsyncStorage.setItem(Config.storageKeys.profileData, localProfileData);
    }
  }
}

export default (new UserManager());