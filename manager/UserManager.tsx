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
import ContentManager from './ContentManager';

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
      SessionManager.setProfileData(response.user.profiles[0]);
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
      SessionManager.setProfileData(response.user.profiles[0]);
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

    //let payload: any = FormManager.objectToFormData({ ...defaults, ...data }); 
    let payload: any = { ...defaults, ...data };
    let response: any = await DataManager.put('updateProfile', payload, variables);

    if (response?.id > 0) success = true;

    return {
      success: success,
      data: response,
    };
  }

  isLoggedIn() {
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
      label = (ContentManager.getProfileTypes().find((o: any) => o.id === profileType))?.label;
    }

    return label?.length > 0 ? label : i18n.t('Unavailable');
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
    let profileData: any = {};
    let localProfileData: any = null;

    if (params?.profile_id > 0) {
      let variables: any = { '[profile_id]': params.profile_id };
      let defaults: any = {};
      profileData = await DataManager.get('getProfile', { ...defaults, ...options }, variables);
    }
    else {
      let userState: any = Store.getState().user;
      profileData = { ...userState.profileData };
    }

    if (ScreenManager.isWeb()) {
      localProfileData = localStorage.getItem(Config.storageKeys.profileData);
    }
    else {
      localProfileData = await AsyncStorage.getItem(Config.storageKeys.profileData);
    }

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
      return null;
    }

    let location: any = await Location.getCurrentPositionAsync({});

    if (!location) {
      location = {
        coords: {
          latitude: Config.defaultLocation.latitude,
          longitude: Config.defaultLocation.longitude,
        },
      };
    }

    return location;
  }

  async getLocationAddress() {
    let location: any = await this.getLocation();
    let geocode: any = await Location.reverseGeocodeAsync(location.coords);

    if (geocode.length > 0) {
      return geocode[0];
    }

    return null;
  }

  async likeJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Like Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response: any = await DataManager.post('likeJam', {
      profile_id: profileData.id,
      item_id: entityId,
      like_action: 'like',
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully liked.');

      this.updateProfileReference('liked_jams', entityId);
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

    let response: any = await DataManager.post('likeJam', {
      profile_id: profileData.id,
      item_id: entityId,
      like_action: 'unlike',
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully unliked.');

      this.updateProfileReference('liked_jams', entityId);
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

    let response: any = await DataManager.post('saveJam', {
      profile_id: profileData.id,
      save_items_ids: [entityId],
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully saved.');

      this.updateProfileReference('saved_jams', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async unsaveJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Unsave Jam'),
      content: i18n.t('Could not perform this action. Please try again.'),
    };

    let response: any = await DataManager.post('unsaveJam', {
      profile_id: profileData.id,
      unsave_items_ids: [entityId],
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully unsaved.');

      this.updateProfileReference('saved_jams', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async deleteJam(entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Delete'),
      content: i18n.t('Could not perform the delete action. Please try again.'),
    };

    let response = await DataManager.delete('deleteJam', {
      profile_id: profileData.id,
      items_ids: [entityId],
    });

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully deleted.');
      await this.updateLocalReference('deletedJams', entityId);
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async reportItem(type: string, entityId: any) {
    let profileData: any = await this.getProfileData();
    let success: boolean = false;
    let message: any = {
      title: i18n.t('Report'),
      content: i18n.t('Could not perform the report action. Please try again.'),
    };

    let payload: any = {
      reporting_person_is_anonymous: parseInt(profileData.id) > 0,
      reporting_profile_id: profileData.id,
      reporting_content_type: type,
      reporting_content_id: entityId,
      reporting_cause: '',
      reporting_comment: '',
    };

    let response: any = await DataManager.post('report', payload);

    if (!response?.error) {
      success = true;
      message.content = i18n.t('The content was successfully reported.');
    }

    return {
      success: success,
      response: response,
      message: message,
    };
  }

  async likeProject(entityId: any) {
    let profileId = await this.getProfileId();
    let response = await DataManager.post('likeProject', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'like',
    });

    return response;
  }

  async unlikeProject(entityId: any) {
    let profileId = await this.getProfileId();
    let response = await DataManager.post('likeProject', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'unlike',
    });

    return response;
  }

  async unsaveProject(entityId: any) {
    let profileId = await this.getProfileId();
    let response = await DataManager.post('unsaveProject', {
      profile_id: profileId,
      unsave_items_ids: [entityId],
    });

    return response;
  }

  updateProfileReference(key: string, value: any) {
    let profileData: any = { ...Store.getState().user.profileData };
    let array: any[] = profileData?.[key] || [];

    profileData[key] = array.includes(value)
      ? array.filter((v: any) => v !== value)
      : [...array, value];

    Store.dispatch(setProfileData(profileData));
  }

  async updateLocalReference(key: string, value: any) {
    if (ScreenManager.isWeb()) {
      let storedData: any = localStorage.getItem(Config.storageKeys[key]);
      let idArray: any[] = [...new Set([...JSON.parse(storedData || '[]'), value])];

      localStorage.setItem(Config.storageKeys[key], JSON.stringify(idArray));
    }
    else {
      let storedData: any = await AsyncStorage.getItem(Config.storageKeys[key]);
      let idArray: any[] = [...new Set([...JSON.parse(storedData || '[]'), value])];

      await AsyncStorage.setItem(Config.storageKeys[key], JSON.stringify(idArray));
    }
  }

  async getViewedNotifications() {
    let idArray: any = '';

    if (ScreenManager.isWeb()) {
      idArray = localStorage.getItem(Config.storageKeys.viewedNotifications);
    }
    else {
      idArray = await AsyncStorage.getItem(Config.storageKeys.viewedNotifications);
    }

    return JSON.parse(idArray || '[]') || [];
  }

  async getDeletedJams() {
    let idArray: any = '';

    if (ScreenManager.isWeb()) {
      idArray = localStorage.getItem(Config.storageKeys.deletedJams);
    }
    else {
      idArray = await AsyncStorage.getItem(Config.storageKeys.deletedJams);
    }

    return JSON.parse(idArray || '[]') || [];
  }
}

export default (new UserManager());