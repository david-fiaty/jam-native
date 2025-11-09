import i18n from "@/translation/i18n";
 
class ContentManager {
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