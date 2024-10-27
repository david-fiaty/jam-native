import Store from '@/redux/Store';
import ApiEndpoints from '@/constants/Endpoints';
import ApiClient from './ApiClient';

class DataManager {
  get(key: keyof typeof ApiEndpoints, filter?: boolean) {
    const data = ApiClient.get(key);
    let results: object = [];

    if (filter) {
      console.log('------');
      console.log(Store.getState().search);
      //return Store.getState().screen.find(item => item.active === true);
    }

    return results.length ? results : data;
  }
};

export default (new DataManager());