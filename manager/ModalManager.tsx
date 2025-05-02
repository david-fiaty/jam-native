import { setActiveModals } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";

class ModalManager {
  toggleModal(modalId: string, params?: any) {
    params = params || {};
    let activeModals: any[] = [...Store.getState().modal.active];
    let activeSections: any[] = [...Store.getState().section.active];
    let sectionId: any = null;

    if (activeSections.length > 0) {
      sectionId = activeSections[activeSections.length - 1];
    }

    if (activeModals.length > 0 && activeModals[activeModals.length - 1].id === modalId) {
      activeModals.pop();
      if (activeModals.length > 0) {
        let lastModal: any = [...activeModals[activeModals.length - 1]];
        lastModal.visible = true;
        activeModals[activeModals.length - 1] = lastModal;
      }
    } 
    else {
      activeModals.push({
        id: modalId,
        params: params,
        sectionId: sectionId,
        visible: true,
      });

      if (activeModals.length > 1) {
        let beforeLastModal: any = [...activeModals[activeModals.length - 2]];
        beforeLastModal.visible = false;
        activeModals[activeModals.length - 2] = beforeLastModal;
      }
    }

    Store.dispatch(setActiveModals(activeModals));
  }
}

export default (new ModalManager());