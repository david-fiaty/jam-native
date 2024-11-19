const Endpoints = {
  jams: {
    url: '/jams/',
    method: 'GET',
    cacheable: true,
    searcheable: true,
  },
  projects: {
    url: '/projects/',
    method: 'GET',
    cacheable: true,
    searcheable: true,
  },
  jammers: {
    cacheable: false,
    searcheable: true,
  },
  notifications: {
    cacheable: false,
    searcheable: false,
  },
  login: {
    url: '/login/',
    method: 'POST',
    cacheable: false,
    searcheable: false,
  },
  signup: {
    url: '/register/',
    method: 'POST',
    cacheable: false,
    searcheable: false,
  },
  currentUser: {
    url: '/get-current-user-info/',
    method: 'GET',
    cacheable: false,
    searcheable: false,
  }
};

export default Endpoints;