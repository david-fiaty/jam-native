import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ProfileManager {
  getFields() {
    return {
      profile_name: {},
      profile_description: {},
      upload_profile_picture: {},
      upload_other_docs: {},
      sectors_ids: {},
      scope_country_code: {},
      region: {},
      town_or_locality: {},
      other_town_or_locality: {},
      address: {},
      geolocation_latitude: {},
      geolocation_longitude: {},
      email: {},
      whatsapp_number: {},
      phone_number: {},
      website_link: {},
      instagram_id: {},
      facebook_link: {},
      linkedin_link: {},
      profile_type: {},
      profile_personal: {},
      profile_organization: {},
      profile_venue: {},
    };
  }
};

export default (new ProfileManager());