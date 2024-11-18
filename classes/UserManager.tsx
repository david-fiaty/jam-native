import { useSelector } from 'react-redux';
import Store from '@/redux/Store';
import DataManager from './DataManager';
import { setAccessToken, setAccountData, setIsLoggedIn } from '@/redux/slices/UserSlice';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('login', {
      email: email,
      password: password,
    });

    if (response?.tokens?.access_token?.length) {
      
    }

    Store.dispatch(setActiveScreen(data));
    
    return response;
  }

  isLoggedIn() {
    return (useSelector((state: any) => state.user)).isLoggedIn === true;
  }

  isAccessTokenValid() {
    // Todo - Validate token duration
    console.log('---oooppp---');
    console.log(useSelector((state: any) => state.user));
  }

  getAccountData() {
    let userState = useSelector((state: any) => state.user);
    let accountData = userState?.accountData || '{}';

    return JSON.parse(accountData);
  }
};

export default (new UserManager());