import { Dimensions, ScaledSize, StatusBar } from 'react-native';

class DeviceManager {
  screen: ScaledSize;
  window: ScaledSize;
  statusBar: object;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
    this.statusBar = this.getStatusBarSize();
  }

  getStatusBarSize() {
    return {
      height: StatusBar.currentHeight,
      width: this.window.width,
    };
  }

  getGridCellSize(numColumns: number) {
    return {
      
    };
  }
};

export default (new DeviceManager());