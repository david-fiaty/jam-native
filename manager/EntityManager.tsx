import Endpoints from '@/constants/Endpoints';
import DataManager from './DataManager';

class EntityManager {
  async find(key: keyof typeof Endpoints, idValues: any) {
    return DataManager.find(key, 'id', idValues);
  }
};

export default (new EntityManager());