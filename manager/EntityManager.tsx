import Endpoints from '@/constants/Endpoints';
import DataManager from './DataManager';
import UserManager from './UserManager';

class EntityManager {
  async find(key: keyof typeof Endpoints, idValues: any) {
    return await DataManager.find(key, 'id', idValues);
  }

  async getJams() {
    return await DataManager.get('jams'); 
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

  async getProfiles() {
    return await DataManager.get('profiles'); 
  }
};

export default (new EntityManager());