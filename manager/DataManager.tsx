import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';

class DataManager {
  async get(key: keyof typeof Endpoints, options?: any, variables?: any) {
    let response: any = await ApiManager.get(key, options, variables);

    if (response.success && Endpoints[key].dataKey !== null) {
      response.payload = response.payload[Endpoints[key].dataKey];
    }

    return response;
  }

  async post(key: keyof typeof Endpoints, data: any, options?: any) {
    return await ApiManager.post(key, data);
  }

  async find(key: keyof typeof Endpoints, idField: string, idValues: any) {
    idValues = Array.isArray(idValues) ? idValues : [idValues];
    let response: any = await ApiManager.get(key);

    if (response.success === true) {
      let haystack: any = response.payload?.[Endpoints[key].dataKey];
      return haystack.find((item: any) => idValues.includes(item[idField]));  
    }

    return [];
  }

  createUuid() { 
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if (d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
};

export default (new DataManager());