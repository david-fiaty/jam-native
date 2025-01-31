import { Dimensions, ScaledSize, StatusBar } from 'react-native';
import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import { setActiveModal } from '@/redux/slices/ModalSlice';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';


class ScreenManager {
  messageTimeout?: any;
  screen: ScaledSize;
  window: ScaledSize;
  statusBar: object;

  constructor() {
    this.screen = Dimensions.get('screen');
    this.window = Dimensions.get('window');
    this.statusBar = this.getStatusBarSize();
  }

  pushScreen(router: any, path: string) {
    this.toggleModal(null);
    router.push(path);
  }

  replaceScreen(router: any, path: string) {
    this.toggleModal(null);
    router.replace(path);
  }

  getStatusBarSize() {
    return {
      height: StatusBar.currentHeight,
      width: this.window.width,
    };
  }

  getGridCellSize(numColumns: number) {
    let value = (this.window.width - Layout.space.base*(numColumns + 2))/numColumns; 

    return {
      width: value,
      height: value,
    };
  }

  getModalEntityId(): any {
    return this.getActiveModal()?.params?.entityId;
  }

  getModalFormState() {
    let reducer: any = this.getActiveModal().params.reducer;
    let storeState: any = Store.getState(); 
    
    return storeState[reducer];
  }

  getActiveModal(): any {
    let activeModals: any = Store.getState().modal.active;
    let length: number = activeModals?.length;
    let index: number = length > 0 ? length - 1 : 0; 

    return activeModals?.[index] || null;
  }

  getModalIndex(): any {
    return Store.getState().modal.active.length + 1;
  }

  toggleModal(name: any, params?: any) {
    Store.dispatch(setActiveModal({
      name: name,
      params: params,
    }));
  }

  getHeaderSize() {
    let height: number = this.window.height/10;

    if (height < Layout.header.minHeight) {
      height = Layout.header.minHeight;
    }
    else if (height > Layout.header.maxHeight) {
      height = Layout.header.maxHeight;
    }

    return {
      width: this.window.width,
      height: height,
    };
  }

  getFooterSize() {
    let height: number = this.window.height/16;

    if (height < Layout.footer.minHeight) {
      height = Layout.footer.minHeight;
    }
    else if (height > Layout.footer.maxHeight) {
      height = Layout.footer.maxHeight;
    }

    return {
      width: this.window.width,
      height: height,
    };
  }

  getModalSize() {
    return {
      width: this.window.width,
      height: this.window.height - this.getHeaderSize().height - this.getFooterSize().height,
    };
  }

  getModalPosition() {
    return {
      x: 0,
      y: this.getHeaderSize().height,
    };
  }

  getFooterPosition() {
    return {
      x: 0, 
      y: this.window.height - this.getFooterSize().height,
    };
  }

  showMessage(payload: any, duration?: number): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    
    Store.dispatch(setMessage({}));
    Store.dispatch(setMessage(payload));

    this.messageTimeout = setTimeout(() => {
      Store.dispatch(setMessage({}));
    }, duration || Config.messageDisplayDuration);
  }
};

export default (new ScreenManager());