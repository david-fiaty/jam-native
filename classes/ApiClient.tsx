import Endpoints from '@/constants/Endpoints';

class ApiClient {
  async get(key: keyof typeof Endpoints) {
    try {
      return await this.sendRequest(Endpoints[key]);
    } 
    catch (error) {
      console.log(error);
    }
  }

  async sendRequest(endpoint: object) {
    if (endpoint?.url && endpoint?.method) {
      try {
        let response = await fetch(endpoint?.url, {
          method: endpoint?.method,
          //credentials: 'include',
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