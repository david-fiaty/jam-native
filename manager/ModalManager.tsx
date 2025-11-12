import { setActiveModals } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";

class ModalManager {
  toggleModal(modalId: string, params?: any) {
    params = params || {};
    let storeState: any = Store.getState();
    let activeModals: any[] = [...storeState.modal.active];
    let activeSections: any[] = [...storeState.section.active];
    let sectionId: any = null;

    if (activeSections.length > 0) {
      sectionId = activeSections[activeSections.length - 1].id;
    }

    if (activeModals.length > 0 && activeModals[activeModals.length - 1].id === modalId) {
      activeModals.pop();
    } 
    else {
      console.log('hhhhhhhhhhhh')
      console.log(activeModals[activeModals.length - 1])

      activeModals.push({
        id: modalId,
        params: params,
        sectionId: sectionId,
      });
    }

    Store.dispatch(setActiveModals(activeModals));
  }
}

export default (new ModalManager());