import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';

class DataManager {
  async get(key: keyof typeof Endpoints, options?: any, variables?: any) {
    let data: any = await ApiManager.get(key, options, variables);

    if (Endpoints[key].dataKey !== null) {
      return data[Endpoints[key].dataKey];
    }

    return data;
  }

  async post(key: keyof typeof Endpoints, data: any, options?: any) {
    return await ApiManager.post(key, data);
  }

  async find(key: keyof typeof Endpoints, idField: string, idValues: any) {
    idValues = Array.isArray(idValues) ? idValues : [idValues];
    let data: any = await ApiManager.get(key);
    let haystack: any = data?.[Endpoints[key].dataKey];
    let result: any = haystack.find((item: any) => idValues.includes(item[idField]));

    return result || {};
  }
};

export default (new DataManager());