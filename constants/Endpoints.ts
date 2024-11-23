const Endpoints = {
  jams: {
    url: '/jams/',
    cacheable: true,
    searcheable: true,
    dataKey: null, 
  },
  projects: {
    url: '/projects/',
    cacheable: true,
    searcheable: true,
    dataKey: null,
  },
  profiles: {
    url: '/profiles/feed/?profile_id=0&profile_type=all&displayed_items_ids=1,2&nbr_items_to_return=10',
    cacheable: false,
    searcheable: true,
    dataKey: null,
  },
  notifications: {
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  login: {
    url: '/login/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  signup: {
    url: '/register/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  currentUser: {
    url: '/get-current-user-info/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
};

export default Endpoints;