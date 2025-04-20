import { setModalId } from "@/redux/slices/ModalSlice";
import Store from "@/redux/Store";

class ModalManager {
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
        id: 'welcome',
        header: false,
        footer: false,
        render: () => <WelcomeSection />,
      },
      {
        id: 'login',
        header: false,
        footer: false,
        render: () => <LoginSection />,
      },
      {
        id: 'about',
        header: true,
        footer: false,
        render: () => <AboutSection />,
      },
      {
        id: 'legal',
        header: true,
        footer: false,
        render: () => <LegalSection />,
      },
      {
        id: 'jams',
        header: true,
        footer: true,
        render: () => <JamsSection />,
      },
    ];
  }
}

export default (new ModalManager());