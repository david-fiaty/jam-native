const ApiClient = class ApiClient {
  constructor() {

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