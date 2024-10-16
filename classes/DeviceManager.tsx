import { Dimensions, ScaledSize } from "react-native";
import { GlobalStyles } from "@/constants/GlobalStyles";

class DeviceManager {
  screen: ScaledSize;
  window: ScaledSize;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
  }

  viewport()  {
    console.log(this.screen);
  
    //console.log(a - b - (GlobalStyles.space*4));
  
  }
};

export default (new DeviceManager());