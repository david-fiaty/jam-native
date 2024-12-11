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
  profileTypes: [
    {
      id: null,
      label: i18n.t('Profile type'),
    },
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
      id: null,
      label: i18n.t('Location type'),
    },
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
};

export default StaticData;
