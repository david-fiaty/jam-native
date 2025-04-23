import Store from "@/redux/Store";
import { setActiveModals } from "@/redux/slices/ModalSlice";

class AppManager {
  push(sectionId: string, router: any, params?: any) {
    requestAnimationFrame(() => {
      let activeModals: any[] = [...Store.getState().modal.active];

      if (activeModals.length > 0) {
        let currentModal: any = {...activeModals.pop()};
        currentModal.visible = false;
        activeModals.push(currentModal);
        Store.dispatch(setActiveModals(activeModals));
      }

      router.push({
        pathname: `/${sectionId}`,
        params: params || {},
      });
    });
  }

  replace(sectionId: string, router: any, params?: any) {
    requestAnimationFrame(() => {
      Store.dispatch(setActiveModals([]));
      
      router.replace({
        pathname: `/${sectionId}`,
        params: params || {},
      });
    });
  }

  back(router: any) {
    requestAnimationFrame(() => {
      let activeModals: any[] = [...Store.getState().modal.active];

      if (activeModals.length > 0) {
        let currentModal: any = {...activeModals.pop()};
        currentModal.visible = true;
        activeModals.push(currentModal);
        Store.dispatch(setActiveModals(activeModals));
      }

      router.back();
    });
  }
}

export default (new AppManager());