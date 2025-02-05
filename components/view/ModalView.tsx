import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import Modal from "react-native-modal";
import ScreenManager from '@/manager/ScreenManager';
import BackButton from "../button/BackButton";
import ModalConfig from "@/constants/ModalConfig";

type Props = BaseProps & {
  children?: any;
};

const ModalView = ({ children }: Props) => {
  const modalState = useSelector((state: any) => state.modal);
  const activeModal: any = ScreenManager.getActiveModal();
  const modalConfig: any = ModalConfig.build();
  const [modalEffects, setModalEffects] = useState<any>({});

  const getModalContainerStyle = (): any => {
    if (isModalVisible()) {
      let position: any = ScreenManager.getModalPosition();
      let size: any = ScreenManager.getModalSize();
      let zIndex: number = ScreenManager.getModalZIndex();

      return {
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        backgroundColor: Colors.white,
        paddingTop: Layout.space.base*3,
        zIndex: zIndex,
        margin: 0,
      };
    }
  
    return {
      backgroundColor: Colors.white,
    };
  };

  const isModalVisible = () => {
    let activeModals: any = modalState.active;
    let activeCount: number = activeModals.length;

    return activeCount > 0 && activeModals[activeCount - 1]?.visible === true;    
  };

  const isModalHidden = () => {
    let activeModals: any = modalState.active;
    let activeCount: number = activeModals.length;

    return activeCount > 0 && activeModals[activeCount - 1]?.visible === false;    
  };

  const renderModalTitle = () => {
    if (isModalVisible() && ScreenManager.getActiveModal()?.params?.title) {
      let modalName: string = activeModal?.name;
      let modalTitle: string = activeModal?.params?.title;

      return (
        <BackButton
          title={modalTitle}
          onPress={() => ScreenManager.toggleModal(modalName)}
          containerStyle={Layout.modalTitleContainer}
        />
      );
    }
    
    return <></>;
  };

  const renderModalContent = () => {
    return modalConfig.find((o: any) => o.name == ScreenManager.getActiveModal()?.name)?.component;
  };

  useEffect(() => {
    if (isModalHidden()) {
      setModalEffects({ in: 'fadeIn', out: 'fadeOut' });
    }
    else {
      setModalEffects(modalConfig.find((o: any) => o.name == activeModal?.name)?.effects);
    }
  }, []);

  return (
    <Modal
      coverScreen={false}
      hasBackdrop={false}
      animationIn={modalEffects?.in}
      animationOut={modalEffects?.out}
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

export default ModalView;
