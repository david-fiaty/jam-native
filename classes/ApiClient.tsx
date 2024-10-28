import { Cache } from "react-native-cache";
import { Config } from "@/constants/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoints from '@/constants/Endpoints';
import ApiMockData from '@/data/ApiMockData';

class ApiClient {
  async get(key: keyof typeof Endpoints) {
    try {
      return await this.sendRequest(Endpoints[key]);
    } catch (error) {
      console.log(error);
    }
  }

  async sendRequest(endpoint: object) {
    try {
      // Send request
      let response = await fetch(endpoint?.url, {
        method: endpoint?.method,
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

  processResponse(jsonResponse: any) {
    return jsonResponse;
  }
};

export default (new ApiClient());