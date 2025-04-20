import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
import TestView from "@/components/view/TestView";

class ModalManager {
  toggleModal(modalId: string) {
    let activeModalId: string = this.getActiveModalId();
    
    if (modalId === activeModalId) Store.dispatch(setModalId(null))
    else Store.dispatch(setModalId(modalId));
  } 

  setActiveModalId(modalId: string) {
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

  getModal(modalId: string) {
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