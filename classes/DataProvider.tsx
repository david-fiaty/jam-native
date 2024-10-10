import ApiEndpoints from '@/constants/ApiEndpoints';

const DataProviderClass = class DataProvider {
  get(key: keyof typeof ApiEndpoints) {
    
    let data = await import(`../data/${key}'.json`);

    console.log(data);
    return {};

  }
};

const DataProvider = new DataProviderClass();
export default DataProvider;