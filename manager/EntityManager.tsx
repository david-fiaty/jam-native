import { Share } from 'react-native';
import { Config } from '@/constants/Config';
import DataManager from './DataManager';
import UserManager from './UserManager';

class EntityManager {
  async report(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('report', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'like',
    });

    return !!response;
  }

  async listProfiles(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: 10,
      profile_type: 'all',
      //nbr_items_to_return: Config.maxApiResults,
    };

    return await DataManager.list('listProfiles', {...defaults, ...options}); 
  }

  async getProfiles(options?: any) {
    let defaults = {};

    return DataManager.list('getProfiles', {...defaults, ...options}); 
  }

  async listJams(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      jam_type: 'all',
      pagination_size: 10,
      //nbr_items_to_return: Config.maxApiResults,
    };

    return await DataManager.list('listJams', {...defaults, ...options}); 
  }

  async getJams(idArray: any, options?: any) {
    let defaults = {};

    return DataManager.get('getJams', idArray, {...defaults, ...options}); 
  }

  async listProjects(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: 10,
      //nbr_items_to_return: Config.maxApiResults,
    };

    return await DataManager.list('listProjects', {...defaults, ...options}); 
  }

  async getProjects(options?: any) {
    let defaults = {};

    return DataManager.list('getProjects', {...defaults, ...options}); 
  }

  async getSectors() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.list('sectors', options); 
  }

  async getProfessions() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.list('professions', options); 
  }

  async getVenueTypes() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.list('venueTypes', options); 
  }

  async getOrganizationTypes() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.list('organizationTypes', options); 
  }

  async getCulturalActivities() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.list('culturalActivities', options); 
  }

  async findJam(entityId: any) {
    return await DataManager.find('listJams', 'id', entityId);
  }

  async saveJam(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('saveJam', {
      profile_id: profileId,
      save_items_ids: [entityId],
    });

    return !!response;
  }

  async addJam(entityData: any) {
    let response = await DataManager.post('addJam', entityData);

    return !!response;
  }

  async likeJam(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('likeJam', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'like',
    });

    return !!response;
  }

  async shareJam(entityId: any) {
    try {
      const result = await Share.share({
        // Todo - Link content to jam
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default (new EntityManager());