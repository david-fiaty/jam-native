import { Config } from '@/constants/Config';
import { Cache } from "react-native-cache";
import Store from '@/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from '@/constants/Endpoints';

const cache = new Cache({
  namespace: Config.appNamespace,
  policy: {
    maxEntries: 50000,
    stdTTL: 0,
  },
  backend: AsyncStorage,
});

class ApiManager {
  async get(key: keyof typeof Endpoints) {
    let data: any = [];

    if (Config.dataCacheEnabled === true) {
      data = await cache.get(key);
    }
    
    try {
      if (!data?.length) {
        data = await this.sendRequest(Endpoints[key]);

        if (Config.dataCacheEnabled === true && data?.length > 0) {
          await cache.set(key, data);
        }
      }

      return data;
    } 
    catch (error) {
      console.log(error);
    }
  }

  async post(key: keyof typeof Endpoints, data: object) {
    try {
      return await this.sendRequest(Endpoints[key], data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async sendRequest(endpoint: any, data?: any) {
    if (endpoint?.url && endpoint?.method) {
      try {
        let url = Config.apiUrl + '/' + endpoint.url;
        let payload: object = {
          ...{
            method: endpoint.method,
            headers: this.getHeaders(),
          },
          ...(data ? { body: JSON.stringify(data) } : {}),
        };

        let response: any = await fetch(url, payload);

        return this.processResponse(await response.json());
      } 
      catch (error) {
        console.error(error);
      }
    }
  }

  processResponse(jsonResponse: any) {
    return jsonResponse;
  }

  getHeaders() {
    const userState = Store.getState().user;
    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (userState.isLoggedIn === true) {
      headers['Authorization'] = `Bearer ${userState.tokenData.access_token}`; 
    }
    
    return headers;
  }
};

export default (new ApiManager());