import Store from '@/redux/Store';
import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';
import EntityManager from './EntityManager';

class DataManager {
  async get(key: keyof typeof Endpoints, options: any) {
    // Variables
    let data: any = await this.getData(key);
    let results: any = [];

    console.log(key);
    if (key == 'currentUser') {
      console.log('zzz');
    console.log(data);
    }

    // Apply search and filter
    if (Endpoints[key].searcheable === true) {
      const searchState = Store.getState().search;
      
      if (options?.filter !== false && searchState.filter?.length) {
        results = data.filter((item: any)  => item?.type == searchState.filter); 
      }

      if (options?.search !== false && searchState.value?.length) {
        results = results.length ? results : data;
        results = data.filter((item: any) => {
          let haystack = item?.description?.toLowerCase();
          let needle = searchState.value.toLowerCase();

          return haystack.includes(needle);
        }); 
      }
    }

    // Process results
    results = results?.length > 0 ? results : data;
    results = Array.isArray(results) ? results.filter(item => Object.keys(item).length !== 0) : [];
    
    return results;
  }

  async post(key: keyof typeof Endpoints, data: any, options?: any) {
    return await ApiManager.post(key, data);
  }

  async getData(key: keyof typeof Endpoints) {
    let data: any = await ApiManager.get(key);
    let result: any = [];

    if (data) {
      data.forEach((item: object) => {
        result.push(EntityManager.create(key, item));
      }); 
    }

    return result;
  }

  async postData(key: keyof typeof Endpoints, data: object, options: object) {

  }
};

export default (new DataManager());