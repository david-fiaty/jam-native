import { Config } from '@/constants/Config';
import Endpoints from '@/constants/Endpoints';
import SessionManager from './SessionManager';

class ApiManager {
  async get(key: keyof typeof Endpoints, options?: any, variables?: any) {
    let url: string = this.getUrl(key, options, variables);
    let data: any = await this.sendRequest(url, 'GET');

    return data;
  }

  async post(key: keyof typeof Endpoints, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(url, 'POST', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async put(key: keyof typeof Endpoints, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(url, 'PUT', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async delete(key: keyof typeof Endpoints, data: any, variables?: any) {
    let url: string = this.getUrl(key, {}, variables);

    try {
      return await this.sendRequest(url, 'DELETE', data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  getUrl(key: keyof typeof Endpoints, options?: any, variables?: any) {
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

  async sendRequest(url: string, method: string, data?: any) {
    try {
      let response: any = await fetch(url, {
        ...{
          method: method,
          headers: await this.getHeaders(),
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

  async getHeaders() {
    let tokenData: any = await SessionManager.getTokenData();
    let headers: any = {
      'Content-Type': 'application/json',
    };

    // Todo - Fix this
    if (tokenData) {
      headers['Authorization'] = `Bearer ${tokenData?.access_token || ''}`; 
      //headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5OTg2Mzg4LCJpYXQiOjE3NDEzNDYzODgsImp0aSI6IjViZjU2MGIyM2M4ZTRhOWRiYjk3M2MxM2E4M2Q5MmFlIiwidXNlcl9pZCI6MTJ9.UtdSMClKbnJ7XuiExdz2NxyfolXnc0mjzqF7-ogB1Xo';
    }
    else {
      //headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5OTg2Mzg4LCJpYXQiOjE3NDEzNDYzODgsImp0aSI6IjViZjU2MGIyM2M4ZTRhOWRiYjk3M2MxM2E4M2Q5MmFlIiwidXNlcl9pZCI6MTJ9.UtdSMClKbnJ7XuiExdz2NxyfolXnc0mjzqF7-ogB1Xo';
    }
    
    return headers;
  }
};

export default (new ApiManager());