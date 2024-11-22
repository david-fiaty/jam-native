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
  profiles: {
    url: '/profiles/feed/?profile_id=0&profile_type=all&displayed_items_ids=1,2&nbr_items_to_return=10',
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