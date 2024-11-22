const Endpoints = {
  jams: {
    url: '/jams/',
    cacheable: true,
    searcheable: true,
  },
  projects: {
    url: '/projects/',
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
    cacheable: false,
    searcheable: false,
  },
  signup: {
    url: '/register/',
    cacheable: false,
    searcheable: false,
  },
  currentUser: {
    url: '/get-current-user-info/',
    cacheable: false,
    searcheable: false,
  },
};

export default Endpoints;