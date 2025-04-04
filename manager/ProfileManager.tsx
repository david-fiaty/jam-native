import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ProfileManager {
  getFields() {
    return {
      profile_name: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      profile_description: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      upload_profile_picture: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      upload_other_docs: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      sectors_ids: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      scope_country_code: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      region: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      town_or_locality: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      other_town_or_locality: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      address: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      geolocation_latitude: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      geolocation_longitude: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      email: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      whatsapp_number: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      phone_number: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      website_link: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      instagram_id: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      facebook_link: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      linkedin_link: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      profile_type: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      profile_personal: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      profile_organization: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
      profile_venue: {
        signup: true,
        profile: true,
        enabled: true,
        render: () => { },
      },
    };
  }
};

export default (new ProfileManager());