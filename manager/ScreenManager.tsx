import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import { setActiveScreen } from '@/redux/slices/ScreenSlice';
import { toggleSearchField } from '@/redux/slices/SearchSlice';
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

  getActiveScreen() {
    return Store.getState().screen.find(item => item.active === true);
  }

  toggleModal(name: string, entityId?: number) {
    if (name != 'SearchView') Store.dispatch(toggleSearchField(false));
  
    Store.dispatch(setActiveScreen({
      name: name,
      entityId: entityId,
    }));
  }

  showMessage(text: string): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    
    Store.dispatch(setMessage(''));
    Store.dispatch(setMessage(text));

    this.messageTimeout = setTimeout(() => Store.dispatch(setMessage('')), 5000);
  }
};

export default (new ScreenManager());