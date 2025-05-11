import i18n from "@/translation/i18n";

const StaticData = {
  welcomeSlideshow: [
    {
      id: 1,
      title: i18n.t('Create better, together'),
      content: i18n.t('Welcome to the Jam app. Jam is a place to explore and experience artists and creatives from different backgrounds in West Africa.'),
    },
    {
      id: 2,
      title: i18n.t('Everything you need'),
      content: i18n.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
    },
    {
      id: 3,
      title: i18n.t('The place to excel'),
      content: i18n.t('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'),
    },
  ],
  languages: [
    {
      label: i18n.t('French'),
      value: 'fr',
    },
    {
      label: i18n.t('English'),
      value: 'en',
    },
  ],
  authTabs: [
    {
      id: 'email',
      label: i18n.t('Email'),
      default: true,
    },
    {
      id: 'phone',
      label: i18n.t('Phone'),
    },
  ],
  searchTabs: [
    {
      id: 'jam',
      label: i18n.t('Jams'),
      numColumns: 2,
    },
    {
      id: 'looking',
      label: i18n.t('Lookings'),
      numColumns: 2,
    },
    {
      id: 'call',
      label: i18n.t('Calls'),
      numColumns: 2,
    },
    {
      id: 'event',
      label: i18n.t('Events'),
      numColumns: 2,
    },
    {
      id: 'jammer',
      label: i18n.t('Jammers'),
      numColumns: 1,
    },
    {
      id: 'personal',
      label: i18n.t('Artists'),
      numColumns: 1,
    },
    {
      id: 'organization',
      label: i18n.t('Organization'),
      numColumns: 1,
    },
    {
      id: 'project',
      label: i18n.t('Projects'),
      numColumns: 2,
    },
    {
      id: 'venue',
      label: i18n.t('Venues'),
      numColumns: 2,
    },
  ],
  profileTypes: [
    {
      id: null,
      label: i18n.t('Select a profile type'),
    },
    {
      id: 'personal',
      label: i18n.t('Personal'),
    },
    {
      id: 'organization',
      label: i18n.t('Organization'),
    },
    {
      id: 'venue',
      label: i18n.t('Venue'),
    },
  ],
  experienceLevels: [
    {
      id: null,
      label: i18n.t('Select a level of experience'),
    },
    {
      id: 'less_than_1_year',
      label: i18n.t('Less than 1 year'),
    },
  ],
  locationTypes: [
    {
      id: 'online',
      label: i18n.t('Online'),
    },
    {
      id: 'physical',
      label: i18n.t('Physical'),
    },
    {
      id: 'online_physical',
      label: i18n.t('Online/Physical'),
    },
  ],
  notificationTypes: [
    {
      id: 'like-jam',
      label: i18n.t('Liked Jam'),
    },
  ],
  jamCategories: [
    {
      id: 'call',
      label: i18n.t('Call'),
      icon: 'megaphone',
    },
    {
      id: 'looking',
      label: i18n.t('Looking'),
      icon: 'link',
    },
    {
      id: 'event',
      label: i18n.t('Event'),
      icon: 'users',
    },
    {
      id: 'random',
      label: i18n.t('Random'),
      icon: 'infinite',
    },
  ],
  privacyStatus: [
    {
      id: 'private',
      label: i18n.t('Private'),
    },
    {
      id: 'public',
      label: i18n.t('Public'),
    },
  ],
};

export default StaticData;
