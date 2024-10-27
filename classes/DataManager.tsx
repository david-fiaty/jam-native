import ApiEndpoints from '@/constants/Endpoints';
import ApiClient from './ApiClient';

class DataManager {
  get(key: keyof typeof ApiEndpoints, filter?: boolean) {
    const data = ApiClient.get(key);

    return data;
  }
};

export default (new DataManager());