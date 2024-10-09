import DataProvider from '@/classes/DataProvider';

const ApiClientClass = class ApiClient {
  constructor() {

  }

  get(dataKey: string) {

    //console.log(process.env.API_URL);
    //console.log(process.env.API_ENABLED);
  
    return DataProvider.get(dataKey);
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