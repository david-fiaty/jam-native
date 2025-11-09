import i18n from "@/translation/i18n";

class ContentManager {
  getPrivacyStatusTypes() {
    return [ 
      {
        id: 'private',
        label: i18n.t('Private'),
      },
      {
        id: 'public',
        label: i18n.t('Public'),
      },
    ];
  }

  getExperienceLevels() {
    return [
      {
        id: null,
        label: i18n.t('Select a level of experience'),
      },
      {
        id: 'less_than_1_year',
        label: i18n.t('Less than 1 year'),
      },
    ];
  }

  getJamTypes() {
    return [
      {
        id: 'call',
        name: i18n.t('Call'),
        icon: 'megaphone',
      },
      {
        id: 'looking',
        name: i18n.t('Looking'),
        icon: 'link',
      },
      {
        id: 'event',
        name: i18n.t('Event'),
        icon: 'users',
      },
      {
        id: 'random',
        name: i18n.t('Random'),
        icon: 'infinite',
      },
    ];
  }

  getLocationTypes() {
    return [
      {
        id: 'online',
        name: i18n.t('Online'),
      },
      {
        id: 'physical',
        name: i18n.t('Physical'),
      },
      {
        id: 'online_physical',
        name: i18n.t('Online/Physical'),
      },
    ];
  }

  getProfileTypes() {
    return [
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
    ];
  }

};

export default (new ContentManager());