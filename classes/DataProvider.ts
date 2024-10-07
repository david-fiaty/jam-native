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

const DataProvider = class DataProvider {
  get(key: DataKey) : object {
    return ApiData[key];
  }
};

export default DataProvider;