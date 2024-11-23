import Endpoints from '@/constants/Endpoints';
import DataManager from './DataManager';

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

  async getProfiles() {
    return await DataManager.get('profiles'); 
  }
};

export default (new EntityManager());