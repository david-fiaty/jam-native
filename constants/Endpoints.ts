const Endpoints = {
  jams: {
    url: '/jams/',
    method: 'GET',
    cacheable: true,
  },
  projects: {
    url: '/projects/',
    method: 'GET',
    cacheable: true,
  },
  jammers: {
    cacheable: false,
  },
  notifications: {
    cacheable: false,
  },
  login: {
    url: '/login/',
    method: 'POST',
    cacheable: false,
  },
  signup: {
    url: '/register/',
    method: 'POST',
    cacheable: false,
  },
  currentUser: {
    url: '/get-current-user-info/',
    method: 'GET',
    cacheable: false,
  }
};

export default Endpoints;