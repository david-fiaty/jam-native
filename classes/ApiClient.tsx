import DataProvider from '@/classes/DataProvider';
import ApiEndpoints from '@/constants/ApiEndpoints';

const ApiClientClass = class ApiClient {
  get(key: keyof typeof ApiEndpoints) {
    return DataProvider.get(key);
  }

  async sendRequest() {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();

      return json.movies;
    } catch (error) {
      console.error(error);
    }
  }

  processResponse() {

  }
};

const ApiClient = new ApiClientClass();
export default ApiClient;