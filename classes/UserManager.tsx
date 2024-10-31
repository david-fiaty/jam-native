import Store from '@/redux/Store';
import DataManager from './DataManager';

class UserManager {
  async login(email: string, password: string) {
    let response = await DataManager.post('user', {
      email: email,
      password: password,
    });

  }
};

export default (new UserManager());