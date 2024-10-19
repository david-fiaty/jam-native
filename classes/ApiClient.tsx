import ApiEndpoints from '@/constants/Endpoints';
import ApiMockData from '@/data/ApiMockData';

class ApiClient {
  get(key: keyof typeof ApiEndpoints) {
    if (process.env.API_ENABLED === 'true') {
      return this.sendRequest(ApiEndpoints[key]);
    }

    return ApiMockData[key];
  }

  async sendRequest(endpoint: object) {
    try {
      // Send request
      let response = await fetch(endpoint.url, {
        method: endpoint.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Process response
      return this.processResponse(await response.json());

    } catch (error) {
      console.error(error);
    }
  }

  processResponse(jsonResponse: string) {
    return jsonResponse;
  }
};

export default (new ApiClient());