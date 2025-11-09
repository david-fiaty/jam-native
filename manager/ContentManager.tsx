import i18n from "@/translation/i18n";
 
class ContentManager {
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