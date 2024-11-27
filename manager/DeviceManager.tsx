import { Dimensions, ScaledSize, StatusBar } from 'react-native';
import * as Location from 'expo-location';

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

  async getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    return await Location.getCurrentPositionAsync({});
  }
};

export default (new DeviceManager());