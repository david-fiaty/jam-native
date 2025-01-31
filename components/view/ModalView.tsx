import React, { useCallback } from "react";
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import Modal from "react-native-modal";
import ScreenManager from '@/manager/ScreenManager';
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";
import ModalConfig from "@/constants/ModalConfig";

type Props = BaseProps & {
  children?: any;
};

const ModalView = ({ children }: Props) => {
  const modalState = useSelector((state: any) => state.modal);
  const activeModal: any = ScreenManager.getActiveModal();
  const modalConfig: any = ModalConfig.build();

  const getModalEffects = useCallback(() => {
    return modalConfig.find((o: any) => o.name == activeModal?.name)?.effects;
  }, [modalConfig, activeModal]);

  const getModalContainerStyle = (): any => {
    if (isModalVisible()) {
      let position: any = ScreenManager.getModalPosition();
      let size: any = ScreenManager.getModalSize();
      let zIndex: number = ScreenManager.getModalIndex();

      return {
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        backgroundColor: Colors.white,
        zIndex: zIndex,
        margin: 0,
      };
    }
  
    return {};
  };

  const renderModalContent = () => {
    return modalConfig.find((o: any) => o.name == ScreenManager.getActiveModal()?.name)?.component;
  };

  const isModalVisible = () => {
    return modalState.active.length > 0;    
  };

  const renderModalTitle = () => {
    if (isModalVisible() && ScreenManager.getActiveModal()?.params?.backTitle) {
      let modalName: string = activeModal?.name;
      let modalTitle: string = activeModal?.params?.backTitle;

      return (
        <BoxView direction="row">
          <BackButton
            title={modalTitle}
            onPress={() => ScreenManager.toggleModal(modalName)}
            containerStyle={styles.modalTitle}
          />
        </BoxView>
      );
    }
    
    return <></>;
  };

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      animationIn={getModalEffects()?.in}
      animationOut={getModalEffects()?.out}
      isVisible={isModalVisible()}
      style={getModalContainerStyle()}
      hideModalContentWhileAnimating={true}
    >
      {!children?.length && renderModalTitle()}
      {!children?.length && renderModalContent()}
        
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    marginLeft: Layout.space.base*1.5,
    width: '100%',
  },
});

export default ModalView;
