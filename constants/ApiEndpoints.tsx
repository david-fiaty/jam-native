const ApiEndpoints = {
  jams: {
    params: {
      url: '/jams/get',
      method: 'POST',
    },
    mock: [
      {
        yes: 'bruh',
      },
      {
        no: 'foe',
      },
    ],
  },
  jammers: {},
  notifications: {},
};

export default ApiEndpoints;