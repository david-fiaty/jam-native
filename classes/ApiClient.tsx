import DataProvider from '@/classes/DataProvider';
import ApiEndpoints from '@/constants/ApiEndpoints';

const ApiClientClass = class ApiClient {
  constructor() {

  }

  get(key: keyof typeof ApiEndpoints) {

    //console.log(process.env.API_URL);
    //console.log(process.env.API_ENABLED);
  
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