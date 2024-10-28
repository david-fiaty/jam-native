import Store from '@/redux/Store';
import ApiEndpoints from '@/constants/Endpoints';
import ApiClient from './ApiClient';
import EntityManager from './EntityManager';

class DataManager {
  async get(key: keyof typeof ApiEndpoints, options: object) {
    // Variables
    const searchState = Store.getState().search;
    let data = await this.getData(key);
    let results: object = [];

    // Apply search
    if (options?.filter !== false && searchState.filter.length) {
      results = data.filter(item => item?.active === true); // Todo - Apply filter fields
    }

    // Apply filters
    if (options?.search !== false && searchState.value.length) {
      results = results.length ? results : data;
      results.filter(item => item?.active === true); // Todo - Apply filter fields
    }

    return results.length ? results : data;
  }

  async getData(key: keyof typeof ApiEndpoints) {
    let data = await ApiClient.get(key);

    if (data) {
      //console.log(console.log(JSON.stringify(data[0].id, 0, 2)));
      let entity = EntityManager.create(key, data[0]);
      
    }

    return data;
  }
};

export default (new DataManager());