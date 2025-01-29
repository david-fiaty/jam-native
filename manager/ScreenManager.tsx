import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import { setActiveModal } from '@/redux/slices/ModalSlice';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';
import DeviceManager from './DeviceManager';

class ScreenManager {
  messageTimeout?: any;

  getGridCellSize(numColumns: number) {
    let value = (DeviceManager.window.width - Layout.space.base*(numColumns + 2))/numColumns; 

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
  
  toggleModal(name: string, params?: any) {
    Store.dispatch(setActiveModal({
      name: name,
      params: params,
    }));
  }

  getHeaderSize() {
    let height: number = DeviceManager.window.height/10;

    if (height < Layout.footer.minHeight) {
      height = Layout.footer.minHeight;
    }
    else if (height > Layout.footer.maxHeight) {
      height = Layout.footer.maxHeight;
    }

    return {
      width: DeviceManager.window.width,
      height: height,
    };
  }

  getFooterSize() {
    let height: number = DeviceManager.window.height/16;

    if (height < Layout.footer.minHeight) {
      height = Layout.footer.minHeight;
    }
    else if (height > Layout.footer.maxHeight) {
      height = Layout.footer.maxHeight;
    }

    return {
      width: DeviceManager.window.width,
      height: height,
    };
  }

  getModalSize() {
    return {
      width: DeviceManager.window.width,
      height: DeviceManager.window.height - this.getHeaderSize().height - this.getFooterSize().height,
    };
  }

  getModalPosition() {
    return {
      x: 0,
      y: this.getHeaderSize().height + Layout.space.base,
    };
  }

  getFooterPosition() {
    return {
      x: 0, 
      y: DeviceManager.window.height - this.getFooterSize().height,
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