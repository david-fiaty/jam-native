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
      pagination_size: Config.paginationSize,
      profile_type: 'all',
    };

    return await DataManager.get('listProfiles', {...defaults, ...options}); 
  }

  async getProfiles(options?: any) {
    let defaults = {};

    return DataManager.get('getProfiles', {...defaults, ...options}); 
  }

  async listJams(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: Config.paginationSize,
      jam_type: 'all',
    };

    return await DataManager.get('listJams', {...defaults, ...options}); 
  }

  async getJams(options?: any) {
    let defaults = {};

    return DataManager.get('getJams', {...defaults, ...options}); 
  }

  async listProjects(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: Config.paginationSize,
    };

    return await DataManager.get('listProjects', {...defaults, ...options}); 
  }

  async getProjects(options?: any) {
    let defaults = {};

    return DataManager.get('getProjects', {...defaults, ...options}); 
  }

  async getSectors() {
    //let language = await UserManager.getLanguage();
    // Todo - Fix creates error in components
    let language = 'en';
    let options = { lang: language };

    return await DataManager.get('sectors', options); 
  }

  async getCountries() {
    //let language = await UserManager.getLanguage();
    // Todo - Fix creates error in components
    let language = 'en';
    let options = { lang: language };

    return await DataManager.get('countries', options); 
  }

  async getProfessions() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.get('professions', options); 
  }

  async getVenueTypes() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.get('venueTypes', options); 
  }

  async getOrganizationTypes() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.get('organizationTypes', options); 
  }

  async getCulturalActivities() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.get('culturalActivities', options); 
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
    let entity = await this.getJams({items_ids: [entityId]});
    let message: string = '';

    if (entity?.title?.length) {
      message += entity.title;
    }

    if (entity?.title?.length && entity?.caption?.length) {
      message += ' | ';
    }

    if (entity?.caption?.length) {
      message += entity.caption;
    }

    try {
      const result = await Share.share({
        message: message,
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