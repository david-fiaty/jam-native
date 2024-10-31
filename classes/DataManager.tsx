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
      results = data.filter(item => item?.type == searchState.filter); 
    }

    // Apply filters
    if (options?.search !== false && searchState.value.length) {
      results = results.length ? results : data;
      results = data.filter(item => {
        let haystack = item?.description?.toLowerCase();
        let needle = searchState.value.toLowerCase();

        return haystack.includes(needle);
      }); 
    }

    return results?.length ? results : data;
  }

  async post(key: keyof typeof ApiEndpoints, data: object, options: object) {
    const response = await ApiClient.post(key, data);

    console.log(response);
  }

  async getData(key: keyof typeof ApiEndpoints) {
    const data: object = await ApiClient.get(key);
    let result: object = [];

    if (data) {
      data.forEach(item => {
        result.push(EntityManager.create(key, item));
      }); 
    }

    return result;
  }


  async postData(key: keyof typeof ApiEndpoints, data: object, options: object) {

  }
};

export default (new DataManager());