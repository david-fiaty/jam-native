const ApiEndpoints = {
  jams: {
    url: '/jams/get',
    method: 'POST',
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