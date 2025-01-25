import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import UserManager from '@/manager/UserManager';
import BackButton from '../button/BackButton';
import ScreenView from './ScreenView';
import BoxView from './BoxView';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  visible?: boolean;
  login?: boolean;
  animation?: string;
  trigger?: any;
  content?: any;
  backTitle?: any;
};

const modalPosition: any = ScreenManager.getModalPosition();

const ModalView = ({ visible, login, animation, trigger, content, backTitle }: Props) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(visible || false);
  const animationType: any = animation || 'slide';
  const isLoggedIn: boolean = UserManager.isLoggedIn();

  const toggleModal = (active: boolean) => {
    if (login && !isLoggedIn) {
      router.push("/login");
    }
    else {
      setModalVisible(active);
    }
  };
  
  return (
    <ScreenView>  
      <TouchableOpacity
        onPress={() => toggleModal(true)}
        style={styles.triggerButton}
      >
        {trigger}
      </TouchableOpacity>
    
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
      >
        <BoxView 
          direction="column" 
          align="flex-start" 
          justify="flex-start" 
          style={styles.modalContainer}
        >
          {backTitle && 
            <BackButton
              title={backTitle}
              onPress={() => toggleModal(false)}
              containerStyle={styles.backButton}
            />
          }
          
          <BoxView direction="column" style={styles.modalContent}>
            {content}
          </BoxView>
        </BoxView>
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: Layout.modal.height,
    marginTop: modalPosition.y,
    //backgroundColor: Colors.white,
    backgroundColor: 'red',
    paddingTop: Layout.space.base*2,
  },
  modalContent: {
    width: '100%',
    flex: 1,
    backgroundColor: 'yellow',
  },
  backButton: {
    marginLeft: Layout.space.base*1.5,
  },
  triggerButton: {
    alignSelf: 'flex-start',
  }
});

export default ModalView;