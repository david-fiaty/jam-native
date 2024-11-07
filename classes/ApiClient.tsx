import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ApiClient {
  async get(key: keyof typeof Endpoints) {
    try {
      let response = await this.sendRequest(Endpoints[key]);

      return response;
    } 
    catch (error) {
      console.log(error);
    }
  }

  async post(key: keyof typeof Endpoints, data: object) {
    try {
      let response = await this.sendRequest(Endpoints[key], data);

      return response;
    } 
    catch (error) {
      console.log(error);
    }
  }

  async sendRequest(endpoint: any, data?: any) {
    if (endpoint?.url && endpoint?.method) {
      try {
        // Todo - Enable domain inclusion
        //let url = Config.apiUrl + '/' + endpoint.url + '/';
        let url = endpoint.url;

        let payload = {
          ...{
            method: endpoint.method,
            headers: this.getHeaders(),
          },
          ...(data ? { body: JSON.stringify(data) } : {}),
        };

        let response = await fetch(url, payload);

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
    return {
      'Content-Type': 'application/json',
    };
  }
};

export default (new ApiClient());