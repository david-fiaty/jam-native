const Endpoints = {
  jams: {
    url: 'https://the.jammm.app/backend/api/v1/jams/',
    method: 'GET',
  },
  projects: {
    url: 'https://the.jammm.app/backend/api/v1/projects/',
    method: 'GET',
  },
  jammers: {},
  notifications: {},
  login: {
    url: 'https://the.jammm.app/backend/api/v1/login/',
    method: 'POST',
  },
  signup: {
    url: 'https://the.jammm.app/backend/api/v1/register/',
    method: 'POST',
  },
  currentUser: {
    url: 'https://the.jammm.app/backend/api/v1/get-current-user-info/',
    method: 'GET',
  }
};

export default Endpoints;