import DataProvider from "./DataProvider";

const ApiClient = class ApiClient {
  constructor() {

  }

  getApiData(dataKey: string) {
    
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

  handleResponse() {

  }
};

export default ApiClient;