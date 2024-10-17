import { Dimensions, ScaledSize } from "react-native";
import { GlobalStyles } from "@/constants/GlobalStyles";

class DeviceManager {
  screen: ScaledSize;
  window: ScaledSize;
  modal: object;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
    this.modal = this.getModalSize();
  }

  getModalSize() {
    return {
      width: this.window.width,
      height: this.window.height - GlobalStyles.header.height - GlobalStyles.footer.height - GlobalStyles.space.base/2,
    };
  } 
};

export default (new DeviceManager());