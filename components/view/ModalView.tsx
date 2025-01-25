import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import UserManager from '@/manager/UserManager';
import BackButton from '../button/BackButton';
import ScreenView from './ScreenView';
import BoxView from './BoxView';
import { Layout } from '@/constants/Layout';

type Props = {
  visible?: boolean;
  login?: boolean;
  animation?: string;
  trigger?: any;
  content?: any;
  backTitle?: any;
};

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
          <BackButton
            title={backTitle}
            onPress={() => toggleModal(false)}
          />
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
    //marginTop: Layout.footer.height,
    //backgroundColor: Colors.white,
    backgroundColor: 'red',
  },
  modalContent: {
    width: '100%',
  },
});

export default ModalView;