import Endpoints from '@/constants/Endpoints';
import DataManager from './DataManager';

class EntityManager {
  async find(key: keyof typeof Endpoints, idArray: any) {
    return DataManager.find(key, 'id', idArray);
  }
};

export default (new EntityManager());