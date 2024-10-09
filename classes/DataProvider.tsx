const ApiData = {
  jams: {
    url: '',
    method: 'POST',
    data: {},
  },
  jammers: {},
  notifications: {},
};

const DataProviderClass = class DataProviderClass {
  get(key: string) {
    console.log(ApiData.jams);
    return 'Data provider';
  }
};

const DataProvider = new DataProviderClass();
export default DataProvider;
