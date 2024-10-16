import { Dimensions, ScaledSize } from "react-native";

class DeviceManager {
  screen: ScaledSize;
  window: ScaledSize;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
  }

  viewport()  {
    
  }
};

export default (new DeviceManager());