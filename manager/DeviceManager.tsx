import { Dimensions, ScaledSize, StatusBar, Platform } from 'react-native';
import { Config } from '@/constants/Config';
import { useLocales } from 'expo-localization';
import * as Location from 'expo-location';
import * as Device from "expo-device";
import i18n from '@/translation/i18n';

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
      console.log(i18n.t("Location features are not available for virtual devices"));
      return null;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      // Todo - Handle location permission error display
      return null;
    }

    let location: any = await Location.getCurrentPositionAsync({});
    
    if (!location) {
      location = {
        latitude: Config.defaultLocation.latitude,
        longitude: Config.defaultLocation.longitude,
      };
    }

    return location;
  }

  getLanguage() {
    let locales = useLocales();
    if (Array.isArray(locales) && locales.length > 0) {
      return locales[0].languageCode; 
    }
  
    return Config.fallbackLanguage;
  };
};

export default (new DeviceManager());

