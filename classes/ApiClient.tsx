import { Cache } from "react-native-cache";
import { Config } from "@/constants/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiEndpoints from '@/constants/Endpoints';
import ApiMockData from '@/data/ApiMockData';

const cache = new Cache({
  namespace: 'jam-native',
  policy: {
    maxEntries: 50000, 
    stdTTL: 0,
  },
  backend: AsyncStorage,
});

class ApiClient {
  get(key: keyof typeof ApiEndpoints) {
    if (Config.apiEnabled === true) {
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