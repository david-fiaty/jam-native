import { Dimensions, ScaledSize, StatusBar, Platform } from 'react-native';
import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import { setActiveModal } from '@/redux/slices/ModalSlice';
import { setActiveRoute } from '@/redux/slices/RouteSlice';
import { Config } from '@/constants/Config';
import Store from '@/redux/Store';
import ModalConfig from '@/constants/ModalConfig';

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

  pushScreen(router: any, path: string, params?: any) {
    let activeModals: any = [...Store.getState().modal.active];
    let lastVisibleIndex = activeModals.map((o: any) => o?.visible).lastIndexOf(true);

    if (lastVisibleIndex !== -1) {
      activeModals[lastVisibleIndex] = {...activeModals[lastVisibleIndex], ...{visible: false}};
    }

    Store.dispatch(setActiveModal(activeModals));
    this.setCurrentRoute(path);

    router.push({
      pathname: path,
      params: params,
    });
  }

  popScreen(router: any) {
    let activeModals: any = [...Store.getState().modal.active];
    let activeRoutes: any = [...Store.getState().route.active];
    let lastHiddenIndex = activeModals.map((o: any) => o?.visible).lastIndexOf(false);

    if (lastHiddenIndex !== -1 && activeRoutes.length < 2) {
      activeModals[lastHiddenIndex] = {...activeModals[lastHiddenIndex], ...{visible: true}};
    }

    Store.dispatch(setActiveModal(activeModals));
    this.setCurrentRoute(null);

    router.back();
  }

  replaceScreen(router: any, path: string, params?: any) {
    this.toggleModal(null); // Todo - Double check this
    
    router.replace({
      pathname: path,
      params: params,
    });
  }

  setCurrentRoute(path?: any) {
    let activeRoutes: any = [...Store.getState().route.active];
    let routeConfig: any[] = Store.getState().route.config;
    let currentRoute: any = routeConfig.find((o: any) => o.name == path?.replace('/', ''));

    if (path && currentRoute) {
      Store.dispatch(setActiveRoute([...activeRoutes, path]));
    }
    else if (activeRoutes.length > 0) {
      Store.dispatch(setActiveRoute(activeRoutes.pop()));
    }
  }

  toggleModal(name: any, params?: any) {
    let activeModals: any = [...Store.getState().modal.active];
    let modalIndex: any = activeModals.findIndex((o: any) => o.name == name);

    if (!name) {
      activeModals = [];
    }
    else if (modalIndex === -1)  {
      activeModals.push({
        name: name,
        params: params,
        visible: true,
      });
    }
    else if (activeModals[modalIndex]?.visible === true) {
      activeModals[modalIndex] = {...activeModals[modalIndex], ...{ visible: false }};
      if (activeModals.length > 1) activeModals[modalIndex - 1] = {...activeModals[modalIndex - 1], ...{ visible: true }};
    }
    else if (activeModals[modalIndex]?.visible === false) {
      activeModals[modalIndex] = {...activeModals[modalIndex], ...{ visible: true }};
      if (activeModals.length > 1) activeModals[modalIndex - 1] = {...activeModals[modalIndex - 1], ...{ visible: false }};
    }
    else {
      activeModals.splice(modalIndex, 1);
    }

    Store.dispatch(setActiveModal(activeModals));
  }

  getActiveModal(): any {
    let activeModals: any[] = [...Store.getState().modal.active];
    let visibleModals: any[] = activeModals.filter((o: any) => o?.visible === true);
    
    if (visibleModals.length > 0) {
      return visibleModals[visibleModals.length - 1];
    }
    else if (activeModals.length > 0) {
      return activeModals[activeModals.length -1];
    }
    
    return null;
  }

  getModalZIndex(): any {
    return Store.getState().modal.active.length + 1;
  }

  getModalEntityId(): any {
    return this.getActiveModal()?.params?.entityId;
  }

  getModalFormState() {
    let reducer: any = this.getActiveModal().params.reducer;
    let storeState: any = Store.getState(); 
    
    return storeState[reducer];
  }

  getModalSize() {
    return {
      width: this.window.width,
      height: this.window.height - this.getHeaderSize().height - this.getFooterSize().height - this.getModalOffsetX(),
    };
  }

  getModalPosition() {
    return {
      x: 0,
      y: this.getHeaderSize().height + this.getModalOffsetX(),
    };
  }

  getModalOffsetX() {
    return Platform.OS === 'ios' ? Layout.space.base*4 : 0;
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

  getHeaderSize() {
    let factor: number = 12;
    let height: number = this.window.height/factor;

    return {
      width: this.window.width,
      height: height,
    };
  }

  getFooterSize() {
    let activeModal: any = this.getActiveModal();
    let currentModalConfig: any = ModalConfig.build().find((o: any) => o.name == activeModal?.name);
    let factor: number = 16;
    let height: number = currentModalConfig?.showFooter === true ? this.window.height/factor : 0;

    return {
      width: this.window.width,
      height: height,
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

  isTablet() {
    // Todo - Implement tablet detection
    return true;
  }

  isDesktop() {
    return Platform.OS === 'web';
  }

  isMobile() {
    return !this.isDesktop() && !this.isTablet(); 
  }
};

export default (new ScreenManager());