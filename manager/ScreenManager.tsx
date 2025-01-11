import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import { setActiveScreen } from '@/redux/slices/ScreenSlice';
import { toggleSearchField } from '@/redux/slices/SearchSlice';
import Store from '@/redux/Store';
import DeviceManager from './DeviceManager';
import SearchManager from './SearchManager';
import { Config } from '@/constants/Config';

class ScreenManager {
  messageTimeout?: any;

  getGridCellSize(numColumns: number) {
    let value = (DeviceManager.window.width - Layout.space.base*(numColumns + 2))/numColumns; 

    return {
      width: value,
      height: value,
    };
  }

  getScreenEntityId(): any {
    return this.getActiveScreen()?.params?.entityId;
  }

  getScreenFormState() {
    let reducer: any = this.getActiveScreen().params.reducer;
    let storeState: any = Store.getState(); 
    
    return storeState[reducer];
  }

  getActiveScreen(): any {
    let screens: any = Store.getState().screen;
    let length: number = screens.length;
    let index: number = length > 0 ? length - 1 : 0; 

    return screens[index];
  }
  
  toggleScreen(name: string, params?: any) {
    if (name != 'SearchView' && SearchManager.isExpanded()) {
      Store.dispatch(toggleSearchField(false));
    }
  
    Store.dispatch(setActiveScreen({
      name: name,
      params: params,
    }));
  }

  showMessage(payload: any): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    
    Store.dispatch(setMessage({}));
    Store.dispatch(setMessage(payload));

    this.messageTimeout = setTimeout(() => {
      Store.dispatch(setMessage({}));
    }, Config.messageDisplayDuration);
  }
};

export default (new ScreenManager());