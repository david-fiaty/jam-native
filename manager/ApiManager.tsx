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
  async list(key: keyof typeof Endpoints, options?: any) {
    let data: any = [];
    let url: string = this.getUrl(key, options);

    if (Config.dataCacheEnabled === true && Endpoints[key].cacheable === true) {
      data = await this.getCacheItem(key);
    }
    
    if (!data?.length) {
      data = await this.sendRequest(url, 'GET');
      if (Config.dataCacheEnabled === true && data?.length > 0) {
        await cache.set(key, data);
      }
    }

    return data;
  }

  async get(key: keyof typeof Endpoints, options?: any) {
    let data: any = [];
    let url: string = this.getUrl(key, options);

    if (Config.dataCacheEnabled === true && Endpoints[key].cacheable === true) {
      data = await this.getCacheItem(key);
    }
    
    if (!data?.length) {
      data = await this.sendRequest(url, 'GET');
      if (Config.dataCacheEnabled === true && data?.length > 0) {
        await cache.set(key, data);
      }
    }

    return data;
  }

  getUrl(key: keyof typeof Endpoints, options?: any) {
    let path: string = Endpoints[key].path;
    let url: string = Config.apiUrl + path;

    if (options) {
      url += '?' + (new URLSearchParams(options).toString());
    }

    return url;
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

  async post(key: keyof typeof Endpoints, data: any) {
    try {

      return await this.sendRequest(this.getUrl(key), 'POST', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async put(key: keyof typeof Endpoints, data: any) {
    try {
      return await this.sendRequest(this.getUrl(key), 'PUT', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async delete(key: keyof typeof Endpoints, data: any) {
    try {
      return await this.sendRequest(this.getUrl(key), 'DELETE', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async sendRequest(url: string, method: string, data?: any) {
    try {
      let response: any = await fetch(url, {
        ...{
          method: method,
          headers: this.getHeaders(),
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      });
  
      return await this.processResponse(response);
    } 
    catch (error) {
      console.error(error);
    }
  }

  async processResponse(response: any) {
    return await response.json();
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