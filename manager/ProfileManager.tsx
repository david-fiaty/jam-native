import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ProfileManager {
  getFields() {
    return {
      profile_name: {
        signup: true,
        profile: true,
      },
      profile_description: {
        signup: true,
        profile: true,
      },
      upload_profile_picture: {
        signup: true,
        profile: true,
      },
      upload_other_docs: {
        signup: true,
        profile: true,
      },
      sectors_ids: {
        signup: true,
        profile: true,
      },
      scope_country_code: {
        signup: true,
        profile: true,
      },
      region: {
        signup: true,
        profile: true,
      },
      town_or_locality: {
        signup: true,
        profile: true,
      },
      other_town_or_locality: {
        signup: true,
        profile: true,
      },
      address: {
        signup: true,
        profile: true,
      },
      geolocation_latitude: {
        signup: true,
        profile: true,
      },
      geolocation_longitude: {
        signup: true,
        profile: true,
      },
      email: {
        signup: true,
        profile: true,
      },
      whatsapp_number: {
        signup: true,
        profile: true,
      },
      phone_number: {
        signup: true,
        profile: true,
      },
      website_link: {
        signup: true,
        profile: true,
      },
      instagram_id: {
        signup: true,
        profile: true,
      },
      facebook_link: {
        signup: true,
        profile: true,
      },
      linkedin_link: {
        signup: true,
        profile: true,
      },
      profile_type: {
        signup: true,
        profile: true,
      },
      profile_personal: {
        signup: true,
        profile: true,
      },
      profile_organization: {
        signup: true,
        profile: true,
      },
      profile_venue: {
        signup: true,
        profile: true,
      },
    };
  }
};

export default (new ProfileManager());