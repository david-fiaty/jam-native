import Store from '@/redux/Store';

const Endpoints = {
  listJams: {
    path: '/jams/mobile-feed/',
    cacheable: true,
    searcheable: true,
    dataKey: 'new_items_to_display', 
  },
  listProjects: {
    path: '/projects/mobile-feed/',
    cacheable: true,
    searcheable: true,
    dataKey: 'new_projects_to_display',
  },
  listProfiles: {
    path: '/profiles/mobile-feed/',
    cacheable: true,
    searcheable: true,
    dataKey: 'new_items_to_display',
  },
  getJams: {
    path: '/jams/',
    cacheable: false,
    searcheable: false,
    dataKey: null, 
  },
  getProfiles: {
    path: '/profiles/',
    cacheable: false,
    searcheable: false,
    dataKey: null, 
  },
  getProjects: {
    path: '/projects/',
    cacheable: false,
    searcheable: false,
    dataKey: null, 
  },
  sectors: {
    path: '/sectors/',
    cacheable: true,
    searcheable: false,
    dataKey: null,
  },
  professions: {
    path: '/professions/',
    cacheable: true,
    searcheable: false,
    dataKey: null,
  },
  venueTypes: {
    path: '/venue-types/',
    cacheable: true,
    searcheable: false,
    dataKey: null,
  },
  organizationTypes: {
    path: '/organization-types/',
    cacheable: true,
    searcheable: false,
    dataKey: null,
  },
  culturalActivities: {
    path: '/cultural-activities/',
    cacheable: true,
    searcheable: false,
    dataKey: null,
  },
  notifications: {
    path: '/profiles/' + Store.getState().user.profileId + '/notifications/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  login: {
    path: '/login/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  register: {
    path: '/register/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  report: {
    path: '/report-items/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  currentUser: {
    path: '/get-current-user-info/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  likeJam: {
    path: '/jams/like/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  saveJam: {
    path: '/jams/save/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
  addJam: {
    path: '/jams/',
    cacheable: false,
    searcheable: false,
    dataKey: null,
  },
};

export default Endpoints;