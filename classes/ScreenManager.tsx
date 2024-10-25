import { Layout } from '@/constants/Layout';
import DeviceManager from './DeviceManager';

class ScreenManager {
  getGridCellSize(numColumns: number) {
    let value = (DeviceManager.window.width - Layout.space.base*(numColumns + 1))/numColumns; 

    return {
      width: value,
      height: value,
    };
  }
};

export default (new ScreenManager());