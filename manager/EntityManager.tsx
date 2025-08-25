import { Share } from 'react-native';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import UserManager from './UserManager';
import i18n from '@/translation/i18n';

class EntityManager {
  async findJam(jamId: any) {
    let currentResults: any = Store.getState().search.currentResults;

    let data = (currentResults.jam || []).find((o: any) => o.id == jamId);

    if (!data) {
      data = (await this.getJams([jamId]))?.[0];
    }     

    return data;
  }

  async listProfiles(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: Config.paginationSize,
      profile_type: 'all',
    };

    return await DataManager.get('listProfiles', { ...defaults, ...options });
  }

  async getProfiles(idArray: any) {
    let defaults: any = {};
    let options: any = {
      items_ids: idArray,
    };

    let response: any = await DataManager.get('getProfiles', { ...defaults, ...options });

    return response;
  }

  async getProfile(profileId: number, options?: any) {
    options = options || {};
    let defaults = {};
    let profileData = [];
    let variables: any = { '[profile_id]': profileId };

    if (profileId > 0) {
      profileData = await DataManager.get('getProfile', { ...defaults, ...options }, variables);
    }

    return profileData || {};
  }

  async updateJam(entityId: number, options: any) {
    let defaults: any = {};
    let variables: any = { '[entity_id]': entityId };

    return await DataManager.put('updateJam', { ...defaults, ...options }, variables);
  }

  async listJams(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: Config.paginationSize,
      jam_type: 'all',
    };

    return await DataManager.get('listJams', { ...defaults, ...options });
  }

  async getJams(idArray: any) {
    let defaults = {};
    let options = {
      items_ids: idArray,
    };

    return await DataManager.get('getJams', { ...defaults, ...options });
  }

  async getComments(idArray: any) {
    let defaults = {};
    let options = {
      items_ids: idArray,
    };

    return await DataManager.get('getComments', { ...defaults, ...options });
  }

  async addComment(entityId: any, commentText: string) {
    let profileId: any = await UserManager.getProfileId();
    let success: boolean = false
    let defaults: any = {};
    let options: any = {
      item_id: entityId,
      profile_id: profileId,
      comment_text: commentText,
    };

    let response: any = await DataManager.post('addComment', { ...defaults, ...options });

    if (response?.comment?.id > 0) success = true;

    return {
      success: success,
      response: response,
    };
  }

  async listProjects(options?: any) {
    let profileId = await UserManager.getProfileId();
    let defaults = {
      profile_id: profileId,
      pagination_size: Config.paginationSize,
    };

    return await DataManager.get('listProjects', { ...defaults, ...options });
  }

  async getProjects(idArray: any) {
    let defaults = {};
    let options = {
      items_ids: idArray,
    };

    return await DataManager.get('getProjects', { ...defaults, ...options });
  }

  async addJamToProject(projectId: number, options?: any) {
    let defaults: any = {};
    let variables: any = { '[project_id]': projectId };

    return await DataManager.put('addJamToProject', { ...defaults, ...options }, variables);
  }

  async getSectors(options?: any) {
    //let language = await UserManager.getLanguage();
    // Todo - Fix creates error in components
    /*
    let language = 'en';
    let options = { lang: language };

    return await DataManager.get('sectors', options); 
    */

    options = options || {};
    let defaults = {};
    let data: any = await DataManager.get('sectors', { ...defaults, ...options });

    if (options?.items_ids?.length) {
      data = data.filter((o: any) => options.items_ids.includes(o.id));
    }

    return data;
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
    // Todo - Add language
    // let language = await UserManager.getLanguage();
    //let options: any = { lang: language };
    let options: any = {};

    return await DataManager.get('venueTypes', options);
  }

  async getOrganizationTypes() {
    let language = await UserManager.getLanguage();
    let options = { lang: language };

    return await DataManager.get('organizationTypes', options);
  }

  async getCulturalActivities() {
    //let language = await UserManager.getLanguage();
    //let options = { lang: language };
    let options: any = {};

    return await DataManager.get('culturalActivities', options);
  }

  async addJam(entityData: any) {
    let response: any = await DataManager.post('addJam', entityData);
    let success: boolean = false;

    if (response?.id > 0) success = true;

    return {
      success: success,
      response: response,
    };
  }

  async addProject(entityData: any) {
    let response: any = await DataManager.post('addProject', entityData);
    let success: boolean = false;

    if (response?.id > 0) success = true;

    return {
      success: success,
      response: response,
    };
  }

  async addProjectsImages(projectsData: any) {
    return await Promise.all(
      projectsData.map(async (item: any) => {
        if (item.id != 'addItem') {
          return {
            ...item,
            firstJam: (await this.getJams([item?.jams[0]]))?.[0], // Todo - Handle no jam[0] found
          }
        }
        else {
          return item;
        }
      })
    );
  }

  async likeProject(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('likeProject', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'like',
    });

    return response;
  }

  async unlikeProject(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('likeProject', {
      profile_id: profileId,
      item_id: entityId,
      like_action: 'unlike',
    });

    return response;
  }

  async unsaveProject(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.post('unsaveProject', {
      profile_id: profileId,
      unsave_items_ids: [entityId],
    });

    return response;
  }

  async deleteJam(entityId: any) {
    let profileId = await UserManager.getProfileId();
    let response = await DataManager.delete('deleteJam', {
      profile_id: profileId,
      items_ids: [entityId],
    });

    return response;
  }

  async shareJam(entityId: any) {
    let entity = await this.getJams([entityId]);
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

  async reportItem(type: string, entityId: any) {
    let profileId: number = await UserManager.getProfileId();
    let isAnonymous: boolean = profileId > 0;
    let payload: any = {
      reporting_person_is_anonymous: isAnonymous,
      reporting_profile_id: profileId,
      reporting_content_type: type,
      reporting_content_id: entityId,
      reporting_cause: '',
      reporting_comment: '',
    };

    let response = await DataManager.post('report', payload);

    return response;
  }

  getLocationTypes() {
    return [
      {
        id: 'online',
        name: i18n.t('Online'),
      },
      {
        id: 'physical',
        name: i18n.t('Physical'),
      },
      {
        id: 'online_physical',
        name: i18n.t('Online/Physical'),
      },
    ];
  }

  getJamTypes() {
    return [
      {
        id: 'call',
        name: i18n.t('Call'),
        icon: 'megaphone',
      },
      {
        id: 'looking',
        name: i18n.t('Looking'),
        icon: 'link',
      },
      {
        id: 'event',
        name: i18n.t('Event'),
        icon: 'users',
      },
      {
        id: 'random',
        name: i18n.t('Random'),
        icon: 'infinite',
      },
    ];
  }
};

export default (new EntityManager());