import ApiEndpoints from '@/constants/ApiEndpoints';

const DataProviderClass = class DataProviderClass {
  get(key: keyof typeof ApiEndpoints) {
    console.log(ApiEndpoints[key]);
    return 'Data xxx';
  }
};

const DataProvider = new DataProviderClass();
export default DataProvider;
