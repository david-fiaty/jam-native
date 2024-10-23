import { Dimensions, ScaledSize, StatusBar } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { Layout } from '@/constants/Layout';

class DeviceManager {
  screen: ScaledSize;
  window: ScaledSize;
  modalView: object;
  statusBar: object;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
    this.modalView = this.getModalViewSize();
    this.statusBar = this.getStatusBarSize();
  }

  getModalViewSize() {
    return {
      width: this.window.width,
      height: this.window.height - StatusBar.currentHeight - Layout.header.height - Layout.footer.height,
    };
  } 

  getStatusBarSize() {
    return {
      height: StatusBar.currentHeight,
      width: this.window.width,
    };
  }
};

export default (new DeviceManager());