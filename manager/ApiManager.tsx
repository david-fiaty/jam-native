import { Config } from '@/constants/Config';
import Endpoints from '@/constants/Endpoints';
import SessionManager from './SessionManager';

class ApiManager {
  async get(key: any, options?: any, variables?: any) {
    let url: string = this.getUrl(key, options, variables);
    let data: any = await this.sendRequest(key, url, 'GET');

    return data;
  }

  async post(key: any, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(key, url, 'POST', data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async put(key: any, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(key, url, 'PUT', data);
    }
    catch (error) {
      console.log(error);
    }
  }

  async delete(key: any, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(key, url, 'DELETE', data);
    }
    catch (error) {
      console.log(error);
    }
  }

  getUrl(key: any, options?: any, variables?: any) {
    let path: string = Endpoints[key].path;
    let url: string = Config.apiUrl + path;

    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        url = url.replace(key, value);
      }
    }

    if (options && Object.keys(options).length > 0) {
      url += '?' + (new URLSearchParams(options).toString());
    }

    return url;
  }

  async sendRequest(key: string, url: string, method: string, data?: any) {
    try {
      // Headers
      let tokenData: any = await SessionManager.getTokenData();
      let body: any = data || {};
      let headers: any = {
        'Content-Type': 'application/json',
      };

      if (Endpoints[key]?.multipart === true) {
        headers['Content-Type'] = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';
      }

      if (Object.keys(tokenData).length > 0 && tokenData?.access_token) {
        headers['Authorization'] = `Bearer ${tokenData.access_token}`;
      }

      // Body
      if (Endpoints[key]?.multipart !== true) {
        body = JSON.stringify(data);
      }

      // Request
      let response: any = await fetch(url, {
          method: method,
          headers: headers,
          body: body,
      });

      return await response.json();
    }
    catch (error) {
      console.error(error, url);
    }
  }
};

export default (new ApiManager());