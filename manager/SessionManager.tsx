import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionManager {
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
      let json: string = JSON.stringify(data);
      await AsyncStorage.setItem(Config.storageKeys.tokenData, json);
    } catch (error) {
      console.log(error);
    }
  }

  async getTokenData() {
    try {
      let json: any = await AsyncStorage.getItem(Config.storageKeys.tokenData);
      return (json) ? JSON.parse(json) : {};
    } catch (error) {
      console.log(error);
    }
  }
}

export default (new SessionManager());