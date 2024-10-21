import ApiEndpoints from '@/constants/ApiEndpoints';
import ApiMockData from '@/constants/ApiMockData';

class ApiClient {
  get(key: keyof typeof ApiEndpoints, apiEnabled: boolean) {
    if (process.env.API_ENABLED === 'true' || apiEnabled === true) {
      return this.sendRequest(ApiEndpoints[key]);
    }

    return ApiMockData[key];
  }

  async sendRequest(endpoint: object) {
    try {
      let response = await fetch(endpoint.url, {
        method: endpoint.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();

    } catch (error) {
      console.error(error);
    }
  }
};

export default (new ApiClient());