import { Cache } from "react-native-cache";
import { Config } from "@/constants/Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiEndpoints from '@/constants/Endpoints';
import ApiMockData from '@/data/ApiMockData';

const cache = new Cache({
  namespace: Config.appNamespace,
  policy: {
    maxEntries: 50000, 
    stdTTL: 0,
  },
  backend: AsyncStorage,
});

class ApiClient {
  get(key: keyof typeof ApiEndpoints, apiEnabled: boolean) {
    (async () => {
      try {
        if (Config.apiEnabled === true || apiEnabled) {
          //let data = await cache.get(key);
          //if (!data) {
            data = this.sendRequest(ApiEndpoints[key]);

            console.log(ApiEndpoints[key]);
            console.log('gggg');
            console.log(data);
          //}
        }
        else {
          data = ApiMockData[key];
        }

        await cache.set(key, data).then;

        return data;

      } catch (error) {
        console.log(error);
      }
    })();

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