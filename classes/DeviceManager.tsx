import { Dimensions, ScaledSize, StatusBar } from "react-native";
import { GlobalStyles } from "@/constants/GlobalStyles";

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
      height: this.window.height - GlobalStyles.header.height - GlobalStyles.footer.height - GlobalStyles.space.base/2,
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