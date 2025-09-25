const Endpoints: any = {
  listJams: {
    path: '/jams/mobile-feed/',
    cacheable: true,
    dataKey: 'new_items_to_display', 
    totalKey: 'total_items_count',
  },
  listProjects: {
    path: '/projects/mobile-feed/',
    cacheable: true,
    dataKey: 'new_items_to_display',
    totalKey: 'total_items_count',
  },
  listProfiles: {
    path: '/profiles/mobile-feed/',
    cacheable: true,
    dataKey: 'new_items_to_display',
    totalKey: 'total_items_count',
  },
  getJams: {
    path: '/jams/',
    cacheable: false,
    dataKey: null, 
  },
  getComments: {
    path: '/comments/',
    cacheable: false,
    dataKey: null, 
  },
  getProfiles: {
    path: '/profiles/',
    cacheable: false,
    dataKey: null, 
  },
  getProfile: {
    path: '/profiles/[profile_id]/',
    cacheable: false,
    dataKey: null, 
  },
  getProjects: {
    path: '/projects/',
    cacheable: false,
    dataKey: null, 
  },
  countries: {
    path: '/countries/',
    cacheable: true,
    dataKey: null,
  },
  sectors: {
    path: '/sectors/',
    cacheable: true,
    dataKey: null,
  },
  professions: {
    path: '/professions/',
    cacheable: true,
    dataKey: null,
  },
  venueTypes: {
    path: '/venue-types/',
    cacheable: true,
    dataKey: null,
  },
  organizationTypes: {
    path: '/organization-types/',
    cacheable: true,
    dataKey: null,
  },
  culturalActivities: {
    path: '/cultural-activities/',
    cacheable: true,
    dataKey: null,
  },
  notifications: {
    path: '/profiles/[profile_id]/notifications/',
    cacheable: false,
    dataKey: 'new_notifications_to_display',
  },
  notificationsRead: {
    path: '/profiles/[profile_id]/notifications/read/',
    cacheable: false,
    dataKey: null,
  },
  login: {
    path: '/login/',
    cacheable: false,
    dataKey: null,
  },
  register: {
    path: '/register/',
    cacheable: false,
    dataKey: null,
  },
  report: {
    path: '/report-items/',
    cacheable: false,
    dataKey: null,
  },
  currentUser: {
    path: '/get-current-user-info/',
    cacheable: false,
    dataKey: 'user',
  },
  changePassword: {
    path: '/change-password/',
    cacheable: false,
    dataKey: null,
  },
  likeProject: {
    path: '/projects/like/',
    cacheable: false,
    dataKey: null,
  },
  likeJam: {
    path: '/jams/like/',
    cacheable: false,
    dataKey: null,
  },
  saveJam: {
    path: '/jams/save/',
    cacheable: false,
    dataKey: null,
  },
  unsaveJam: {
    path: '/jams/save/',
    cacheable: false,
    dataKey: null,
  },
  addComment: {
    path: '/jams/comments/create/',
    cacheable: false,
    dataKey: null,
  },
  addJam: {
    path: '/jams/',
    cacheable: false,
    dataKey: null,
  },
  updateJam: {
    path: '/jams/',
    cacheable: false,
    dataKey: null,
  },
  deleteJam: {
    path: '/jams/',
    cacheable: false,
    dataKey: null,
  },
  addProject: {
    path: '/projects/',
    cacheable: false,
    dataKey: null,
  },
  addJamToProject: {
    path: '/projects/[project_id]/jams/add/',
    cacheable: false,
    dataKey: null,
  },
  unsaveProject: {
    path: '/projects/',
    cacheable: false,
    dataKey: null,
  }, 
  updateProfile: {
    path: '/profiles/[profile_id]/',
    cacheable: false,
    dataKey: null,
  },
  sendSignupCode: {
    path: '/send-registration-verification/',
    cacheable: false,
    dataKey: null,
  },
  verifySignupCode: {
    path: '/verify-registration/',
    cacheable: false,
    dataKey: null,
  },
};

export default Endpoints;