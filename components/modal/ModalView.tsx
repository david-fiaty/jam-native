import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';
import ModalBackButton from './navigation/ModalBackButton';
import SectionManager from '@/manager/SectionManager';

type Props = {
  style?: any;
};

const ModalView = ({ style }: Props) => {
  const [currentModal, setCurrentModal] = useState<any>(null);
  const modalState: any = useSelector((state: any) => state.modal);

  const canShowModal = () => {
    return currentModal !== null && currentModal?.visible === true;
  };

  const renderBackButton = () => {
    if (currentModal?.showTitle === true && currentModal?.showBackButton === true) {
      return <ModalBackButton currentModal={currentModal} />;
    }

    return <></>;
  }

  const renderModal = () => {
    if (currentModal) {
      return ModalManager.getModal(currentModal.id).render(currentModal.params);
    }

    return <></>;
  }

  useEffect(() => {
    setCurrentModal(ModalManager.getActiveModal());
  });

  console.log(currentModal);
  
  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      hideModalContentWhileAnimating={true}
      animationIn={currentModal?.effect?.in}
      animationOut={currentModal?.effect?.out}
      isVisible={canShowModal()}
      style={[styles.container, style]}
    >
      {renderBackButton()}

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
