import Store from '@/redux/Store';
import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';

class DataManager {
  async get(key: keyof typeof Endpoints, options?: any) {
    // Variables
    let data: any = await ApiManager.get(key);
    let results: any = [];

    // Extract data with key
    if (Endpoints[key].dataKey !== null) {
      return data[Endpoints[key].dataKey];
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
          let haystack = item?.caption?.toLowerCase();
          let needle = searchState.value.toLowerCase();

          return haystack.includes(needle);
        }); 
      }

      // Process results
      results = results?.length > 0 ? results : data;
      results = Array.isArray(results) ? results.filter(item => Object.keys(item).length !== 0) : [];
    }
    else {
      results = data;
    }

    return results;
  }

  async post(key: keyof typeof Endpoints, data: any, options?: any) {
    return await ApiManager.post(key, data);
  }

  async find(key: keyof typeof Endpoints, idField: string, idValues: any) {
    idValues = Array.isArray(idValues) ? idValues : [idValues];
    let data: any = await ApiManager.get(key);
    let result: any = data.find((item: any) => idValues.includes(item[idField]));

    return result || {};
  }
};

export default (new DataManager());