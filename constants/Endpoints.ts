const Endpoints = {
  jams: {
    url: 'https://dev.jammm.app/backend/api/jams/',
    method: 'GET',
  },
  projects: {
    url: 'https://dev.jammm.app/backend/api/projects/',
    method: 'GET',
  },
  jammers: {},
  notifications: {},
  login: {
    url: 'https://the.jammm.app/backend/api/login/',
    method: 'POST',
  },
  signup: {
    url: 'https://the.jammm.app/backend/api/register/',
    method: 'POST',
  },
};

export default Endpoints;