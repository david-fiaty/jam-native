import { setTokenData, setProfileData } from '@/redux/slices/UserSlice';
import Store from "@/redux/Store";

class SessionManager {
  setTokenData(data: any) {
    Store.dispatch(setTokenData(data));
  }

  setProfileData(data: any) {
    Store.dispatch(setProfileData(data));
  }

  getTokenData() {
    let userState: any = Store.getState().user;
    let tokenData: any = userState.tokenData;

    return tokenData;
  }
}

export default (new SessionManager());