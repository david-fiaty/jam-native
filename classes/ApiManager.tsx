import { Config } from '@/constants/Config';
import { Cache } from "react-native-cache";
import Store from '@/redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from '@/constants/Endpoints';

const cache = new Cache({
  namespace: Config.appNamespace,
  backend: AsyncStorage,
  policy: {
    maxEntries: 50000,
    stdTTL: 0,
  },
});

class ApiManager {
  async get(key: keyof typeof Endpoints) {
    let data: any = [];
    if (Config.dataCacheEnabled === true && Endpoints[key].cacheable === true) {
      data = await this.getCacheItem(key);
    }
    
    if (!data?.length) {
      data = await this.sendRequest(Endpoints[key], 'GET');
      if (Config.dataCacheEnabled === true && data?.length > 0) {
        await cache.set(key, data);
      }
    }

    return data;
  }

  async getCacheItem(key: keyof typeof Endpoints) {
    try {
      return await cache.get(key);
    } 
    catch (error) {
      console.log(error);
      await cache.remove(key);
    }

    return null;
  }

  async post(key: keyof typeof Endpoints, data: object) {
    try {
      return await this.sendRequest(Endpoints[key], 'POST', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async put(key: keyof typeof Endpoints, data: object) {
    try {
      return await this.sendRequest(Endpoints[key], 'PUT', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async delete(key: keyof typeof Endpoints, data: object) {
    try {
      return await this.sendRequest(Endpoints[key], 'DELETE', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async sendRequest(endpoint: any, method: string, data?: any) {
    if (endpoint?.url) {
      try {
        let url = Config.apiUrl + endpoint.url;
        let payload: object = {
          ...{
            method: method,
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
    let tokenData: any = userState.tokenData ? userState.tokenData : {};
    let isLoggedIn: boolean = userState.isLoggedIn === true;

    let headers: any = {
      'Content-Type': 'application/json',
    };

    if (isLoggedIn && tokenData) {
      let tokenObject = JSON.parse(tokenData);
      headers['Authorization'] = `Bearer ${tokenObject.access_token}`; 
    }
    
    return headers;
  }
};

export default (new ApiManager());