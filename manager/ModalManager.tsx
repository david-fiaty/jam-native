import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
import TestView from "@/components/view/TestView";

class ModalManager {
  toggleModal(modalId: any) {
    let activeModalId: any = this.getActiveModalId();
    let currentModalId: any = modalId === activeModalId ? modalId : null;
    
    this.setActiveModalId(currentModalId);
  } 

  setActiveModalId(modalId: any) {
    Store.dispatch(setModalId(modalId));
  }

  getActiveModal() {
    let modalId: any = this.getActiveModalId();
    let section: any = this.getModal(modalId);

    return section;
  }

  getActiveModalId() {
    return Store.getState().modal.modalId;
  }

  getModal(modalId: any) {
    return this.getModals().find((o: any) => o.id === modalId);
  }

  getModals() {
    return [
      {
        name: 'TestView', 
        render: () => <TestView />,
      },
    ];
  }
}

export default (new ModalManager());