import TextView from '@/components/view/TextView';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";

const SectionModal = () => {
  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      isVisible={true}
      hideModalContentWhileAnimating={true}
      //animationIn={modalEffects?.in}
      //animationOut={modalEffects?.out}
      //isVisible={isModalVisible()}
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
