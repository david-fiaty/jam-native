import DataProvider from './DataProvider';

const ApiClient = class ApiClient {
  constructor() {

  }

  getApiData(dataKey: string) {
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

export default ApiClient;