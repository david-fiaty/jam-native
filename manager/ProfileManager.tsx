import Endpoints from '@/constants/Endpoints';
import { Config } from '@/constants/Config';

class ProfileManager {
  getFields() {
    return {
      profile_picture: {},
      email: {},
      profile_name: {},
      profile_type: {},
      profile_description: {},
      sectors_ids: {},
      geolocation_latitude: {},
      geolocation_longitude: {},
      address: {},
      city: {},
      region: {},
      country: {},
    };
  }
};

export default (new ProfileManager());