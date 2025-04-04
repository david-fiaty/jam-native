import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';
import i18n from '@/translation/i18n';

class ProfileManager {
  renderFields() {
    let fields: any = this.getFields();
    let output: any = [];

    for (const [key, item] of Object.entries(fields)) {
      output.push(item.render(item));
    }

    return output;
  }

  getFields() {
    return {
      profile_name: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Profile name'),
        render: (item: any) => {},
       },
       profile_description: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('About'),
        render: (item: any) => {},
       },
       upload_profile_picture: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Profile picture'),
        render: (item: any) => {},
       },
       upload_other_docs: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Other documents'),
        render: (item: any) => {},
       },
       sectors_ids: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Sectors'),
        render: (item: any) => {},
       },
       scope_country_code: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Country'),
        render: (item: any) => {},
       },
       region: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Region'),
        render: (item: any) => {},
       },
       town_or_locality: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Locality'),
        render: (item: any) => {},
       },
       other_town_or_locality: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Other locality'),
        render: (item: any) => {},
       },
       address: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Address'),
        render: (item: any) => {},
       },
       geolocation_latitude: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Latitude'),
        render: (item: any) => {},
       },
       geolocation_longitude: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Longitude'),
        render: (item: any) => {},
       },
       email: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Email'),
        render: (item: any) => {},
       },
       whatsapp_number: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Whatsapp number'),
        render: (item: any) => {},
       },
       phone_number: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Phone number'),
        render: (item: any) => {},
       },
       website_link: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Website link'),
        render: (item: any) => {},
       },
       instagram_id: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Instagram ID'),
        render: (item: any) => {},
       },
       facebook_link: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Facebook link'),
        render: (item: any) => {},
       },
       linkedin_link: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Linkedin link'),
        render: (item: any) => {},
       },
       profile_type: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Profile type'),
        render: (item: any) => {},
       },
       profile_personal: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Personal profile'),
        render: (item: any) => {},
       },
       profile_organization: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Organization profile'),
        render: (item: any) => {},
       },
       profile_venue: {
        signup: true,
        profile: true,
        enabled: true,
        required: true,
        label: i18n.t('Venue profile'),
        render: (item: any) => {},
       },       
    };
  }
};

export default (new ProfileManager());