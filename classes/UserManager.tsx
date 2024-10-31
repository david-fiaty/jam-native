import Store from '@/redux/Store';
import DataManager from './DataManager';

class UserManager {
  login(email: string, password: string) {
    console.log(email);
    console.log(password);
  }
};

export default (new UserManager());