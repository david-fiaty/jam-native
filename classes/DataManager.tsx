import Store from '@/redux/Store';
import ApiEndpoints from '@/constants/Endpoints';
import ApiClient from './ApiClient';

class DataManager {
  async get(key: keyof typeof ApiEndpoints, options: object) {
    const searchState = Store.getState().search;
    let data = await ApiClient.get(key);
    let results: object = [];

    if (options?.filter !== false && searchState.filter.length) {
      results = data.filter(item => item?.active === true); // Todo - Apply filter fields
    }

    if (options?.search !== false && searchState.value.length) {
      results = results.length ? results : data;
      results.filter(item => item?.active === true); // Todo - Apply filter fields
    }

    return results.length ? results : data;
  }
};

export default (new DataManager());