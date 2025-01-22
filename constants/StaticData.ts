import i18n from "@/translation/i18n";

const StaticData = {
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
  searchTabs: [
    {
      id: 'call',
      label: i18n.t('Calls'),
      numColumns: 2,
    },
    {
      id: 'jammer',
      label: i18n.t('Jammers'),
      numColumns: 1,
    },

    {
      id: 'project',
      label: i18n.t('Projects'),
      numColumns: 2,
    },
    {
      id: 'event',
      label: i18n.t('Events'),
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
      id: 'personal',
      label: i18n.t('Personal'),
    },
    {
      id: 'organization',
      label: i18n.t('Organization'),
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
