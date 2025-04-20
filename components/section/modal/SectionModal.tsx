import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import TextView from '@/components/view/TextView';
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';

const SectionModal = () => {
  const modalState: any = useSelector((state: any) => state.modal);

  const getIsVisible = () => {
    return modalState.modalId !== null;
  };

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      hideModalContentWhileAnimating={true}
      //animationIn={modalEffects?.in}
      //animationOut={modalEffects?.out}
      isVisible={getIsVisible()}
      style={styles.container}
    >

      {<TextView>MODAL CONTENT</TextView>}  
      {/*ModalManager.getModal(modalState.modalId)?.render()*/}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    //width: '100%',

  },
});

export default SectionModal;
