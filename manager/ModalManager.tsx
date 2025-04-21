import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";
import TestModal from "@/components/modal/TestModal";
import JamForm from "@/components/form/JamForm";
import i18n from "@/translation/i18n";
import JamsMapView from "@/components/view/JamsMapView";

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
        id: 'JamForm',
        title: i18n.t('Create a jam'),
        render: () => <JamForm />,
      },
      {
        id: 'JamsMapView',
        title: i18n.t('Jams map'),
        render: () => <JamsMapView />,
      },
    ].map((o: any) => {
      return {
        ...{
          showTitle: true,
          showBackButton: true,
          effect: {
            in: 'slideInUp', 
            out: 'slideOutDown',
          },
        },
        ...o,
      };
    });
  }
}

export default (new ModalManager());