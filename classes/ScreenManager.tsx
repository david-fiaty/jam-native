import { Layout } from '@/constants/Layout';
import { Modals } from '@/constants/Modals';
import Store from '@/redux/Store';
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
    let state: any = Store.getState();
    let screenName = state.name;

    return Modals.find((item: any) => item.name === screenName);
  }
};

export default (new ScreenManager());