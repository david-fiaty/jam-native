import Store from '@/redux/Store';
import { Layout } from '@/constants/Layout';
import DeviceManager from './DeviceManager';

class ScreenManager {
  getGridCellSize(numColumns: number) {
    let value = (DeviceManager.window.width - Layout.space.base*(numColumns + 2))/numColumns; 

    return {
      width: value,
      height: value,
    };
  }

  getActiveScreen() {
    return Store.getState().screen.find(item => item.active === true);
  }
};

export default (new ScreenManager());