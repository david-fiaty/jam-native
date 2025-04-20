import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextView from '@/components/view/TextView';
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';

const SectionModal = () => {

  const getIsVisible = () => {
    console.log('---->', ModalManager.getActiveModalId())
    return ModalManager.getActiveModalId() !== null;
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
        
      <TextView>MODAL CONTENT</TextView>
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
