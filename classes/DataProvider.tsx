import ApiEndpoints from '@/constants/ApiEndpoints';

const DataProviderClass = class DataProviderClass {
  get(key: keyof typeof ApiEndpoints) {
    return ApiEndpoints[key];
  }
};

const DataProvider = new DataProviderClass();
export default DataProvider;
