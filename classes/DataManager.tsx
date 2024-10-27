import Store from '@/redux/Store';
import ApiEndpoints from '@/constants/Endpoints';
import ApiClient from './ApiClient';

class DataManager {
  get(key: keyof typeof ApiEndpoints, search?: boolean, filter?: boolean) {
    let results: object = [];
    const data = ApiClient.get(key);
    const searchState = Store.getState().search;

    search = search === false ? false : true;
    filter = filter === false ? false : true;


    if (filter) {
      console.log(searchState);
      //results = searchState.filter(item => item?.active === true);
    }

    return data;

    return results?.length ? results : data;
  }
};

export default (new DataManager());