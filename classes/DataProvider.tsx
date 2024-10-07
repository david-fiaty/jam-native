const ApiData = {
  jams: {
    url: '',
    method: 'POST',
    data: {},
  },
  jammers: {},
  notifications: {},
};

type DataKey = keyof typeof ApiData;

const DataProviderClass = class DataProviderClass {
  get(key: DataKey) : object {
    return ApiData[key];
  }
};

const DataProvider = new DataProviderClass();

export default DataProvider;
