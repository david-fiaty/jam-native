import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';
import ModalBackButton from './navigation/ModalBackButton';

const ModalView = () => {
  const modalState: any = useSelector((state: any) => state.modal);
  const currentModal: any = ModalManager.getActiveModal();

  const isModalVisible = () => {
    return modalState.modalId !== null;
  };

  const renderModal = () => {
    if (modalState.modalId) {
      return ModalManager.getModal(modalState.modalId)?.render();
    }

    return <></>;
  }

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      hideModalContentWhileAnimating={true}
      animationIn={currentModal?.effect?.in}
      animationOut={currentModal?.effect?.out}
      isVisible={isModalVisible()}
      style={styles.container}
    >
      { currentModal?.showTitle === true
        && currentModal?.showBackButton === true 
        && <ModalBackButton currentModal={currentModal} />}

      {renderModal()}

    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: '100%',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ModalView;
