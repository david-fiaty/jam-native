import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '@/constants/Config';

class SessionManager {
  getTokenStorageKey() {
    return `${Config.storageKey}:tokens`;
  }

  async isTokenValid() {
    let data: any = await this.getTokenData();
    let exists: boolean = data?.access_token?.length > 0;
    let valid: boolean = true;
    // Todo - Check expiry date sent by server
    //let valid: boolean = data?.access_token_exp && data.access_token_exp > Date.now();

    return exists && valid;
  }

  async setTokenData(data: any) {
    try {
      let storageKey: string = this.getTokenStorageKey();
      let json: string = JSON.stringify(data);

      await AsyncStorage.setItem(storageKey, json);
    } catch (error) {
      console.log(error);
    }
  }

  async getTokenData() {
    try {
      let storageKey: string = this.getTokenStorageKey();
      let json: any = await AsyncStorage.getItem(storageKey);

      return (json) ? JSON.parse(json) : {};
    } catch (error) {
      console.log(error);
    }
  }
}

export default (new SessionManager());