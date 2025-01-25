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