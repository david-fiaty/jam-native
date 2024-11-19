const Endpoints = {
  jams: {
    url: '/jams/',
    method: 'GET',
  },
  projects: {
    url: '/projects/',
    method: 'GET',
  },
  jammers: {},
  notifications: {},
  login: {
    url: '/login/',
    method: 'POST',
  },
  signup: {
    url: '/register/',
    method: 'POST',
  },
  currentUser: {
    url: '/get-current-user-info/',
    method: 'GET',
  }
};

export default Endpoints;