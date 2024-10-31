import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ApiClient {
  async get(key: keyof typeof Endpoints) {
    try {
      return await this.sendRequest(Endpoints[key]);
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

  async sendRequest(endpoint: object, data?: object ) {
    if (endpoint?.url && endpoint?.method) {
      try {
        // Todo - Enable domain inclusion
        //let url = Config.apiUrl + '/' + endpoint.url + '/';
        let url = endpoint.url;


        let response = await fetch(url, {
          method: endpoint.method,
          headers: this.getHeaders(),
        });

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