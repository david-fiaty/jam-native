import { Share } from 'react-native';
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

  async getProfiles() {
    return await DataManager.get('profiles'); 
  }

  async getJams() {
    return await DataManager.get('jams'); 
  }

  async getSectors() {
    return await DataManager.get('sectors'); 
  }

  async findJam(entityId: any) {
    return await DataManager.find('jams', 'id', entityId);
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