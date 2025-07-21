import { setTokenData } from '@/redux/slices/UserSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from "@/redux/Store";

class SessionManager {
  async setTokenData(data: any) {
    Store.dispatch(setTokenData(data));
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