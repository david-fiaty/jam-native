import { Dimensions, ScaledSize, StatusBar, Platform } from 'react-native';
import { Config } from '@/constants/Config';
import { getLocales } from 'expo-localization';
import * as Location from 'expo-location';
import * as Device from "expo-device";


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
    if (Platform.OS === "android" && !Device.isDevice) {
      console.log("Location features are not available for virtual devices");
      return null;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }
    

    return await Location.getCurrentPositionAsync({});
  }

  getLanguage() {
    const locales = RNLocalize.getLocales();

    console.log('---', locales);
  
    if (Array.isArray(locales) && locales.length > 0) {
      return locales[0].languageTag; 
    }
  
    return Config.fallbackLanguage;
  };
};

export default (new DeviceManager());

