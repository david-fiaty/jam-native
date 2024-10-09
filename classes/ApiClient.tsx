import ApiEndpoints from '@/constants/ApiEndpoints';

const ApiClientClass = class ApiClient {
  get(key: keyof typeof ApiEndpoints) {
    if (process.env.API_ENABLED === 'true') {
      return this.sendRequest(ApiEndpoints[key]);
    }

    return ApiEndpoints[key].mock;
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

const ApiClient = new ApiClientClass();
export default ApiClient;