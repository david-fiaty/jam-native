import Store from "@/redux/Store";
import { setActiveModals } from "@/redux/slices/ModalSlice";

class AppManager {
  push(sectionId: string, router: any, params?: any) {
    let activeModals: any[] = [...Store.getState().modal.active];

    if (activeModals.length > 0) {
      activeModals[activeModals.length -1].visible = false;
      setActiveModals(activeModals);
    }

    router.push({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  replace(sectionId: string, router: any, params?: any) {
    router.replace({
      pathname: `/${sectionId}`,
      params: params || {},
    });
  }

  back(router: any) {
    router.back();
  }
}

export default (new AppManager());