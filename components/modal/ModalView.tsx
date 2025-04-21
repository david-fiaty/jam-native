import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import TextView from '@/components/view/TextView';
import Modal from "react-native-modal";
import ModalManager from '@/manager/ModalManager';
import IconView from '../view/IconView';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';

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
      //animationIn={modalEffects?.in}
      //animationOut={modalEffects?.out}
      isVisible={isModalVisible()}
      style={styles.container}
    >
      {currentModal?.showBackButton === true && <BoxView
        direction="row"
        align="center"
        justify="flex-start"
        style={styles.backButtonContainer}
        onPress={() => {}}
      >
        <IconView
          name="previous"
          theme="clear"
          padding={0}
        />

        <TextView>{currentModal?.title}</TextView>

      </BoxView>}

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
  },
  backButtonContainer: {
    backgroundColor: 'red',
    width: '100%',
    padding: Layout.space.base,
    paddingLeft: 0,
  },
});

export default ModalView;
