import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import TextView from '@/components/view/TextView';
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';

const ModalView = () => {
  const modalState: any = useSelector((state: any) => state.modal);

  const isModalVisible = () => {
    return modalState.modalId !== null;
  };

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      hideModalContentWhileAnimating={true}
      //animationIn={modalEffects?.in}
      //animationOut={modalEffects?.out}
      isVisible={isModalVisible()}
      style={styles.container}
    >
      {ModalManager.getModal(modalState.modalId)?.render()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    //width: '100%',

  },
});

export default ModalView;
