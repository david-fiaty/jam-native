import { setTokenData } from '@/redux/slices/UserSlice';
import { Config } from '@/constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Store from "@/redux/Store";

class SessionManager {
  setTokenData(data: any) {
    Store.dispatch(setTokenData(data));
  }

  getTokenData() {
    let userState: any = Store.getState().user;
    let tokenData: any = userState.tokenData;

    return tokenData;
  }
}

export default (new SessionManager());