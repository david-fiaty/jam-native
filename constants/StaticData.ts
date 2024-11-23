import i18n from "@/translation/i18n";

const StaticData = {
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
      id: 'organisation',
      label: i18n.t('Organisation'),
    },
  ],
  jamCategories: [
    {
      id: 'calls',
      label: i18n.t('Calls'),
      icon: 'megaphone',
    },
    {
      id: 'looking',
      label: i18n.t('Looking'),
      icon: 'link',
    },
    {
      id: 'events',
      label: i18n.t('Events'),
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
