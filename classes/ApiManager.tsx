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
        let url = Config.apiUrl + endpoint.url;
        let payload: object = {
          ...{
            method: endpoint.method,
            headers: this.getHeaders(),
          },
          ...(data ? { body: JSON.stringify(data) } : {}),
        };

        let response: any = await fetch(url, payload);
        if (!response.ok) throw Error(response.status);
    
        let jsonResponse = await response.json();
        let processedResponse = this.processResponse(jsonResponse);

        return processedResponse;
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
    const userState: any = Store.getState().user;

    
    let tokenData: any = JSON.parse(userState.tokenData || '{}');
    let isLoggedIn: boolean = userState.isLoggedIn === true;


    console.log(tokenData);


    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (isLoggedIn && tokenData?.access_token?.length) {
      headers['Authorization'] = `Bearer ${tokenData.access_token}`; 
    }
    
    return headers;
  }
};

export default (new ApiManager());