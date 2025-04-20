import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
import TestModal from "@/components/modal/TestModal";

class ModalManager {
  toggleModal(modalId: any) {
    let activeModalId: any = this.getActiveModalId();
    let currentModalId: any = modalId === activeModalId ? null : modalId;
    
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
        id: 'TestView', 
        render: () => <TestModal />,
      },
    ];
  }
}

export default (new ModalManager());