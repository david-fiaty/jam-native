import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import UserManager from '@/manager/UserManager';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';
import ScreenView from './ScreenView';
import BoxView from './BoxView';
import { Colors } from '@/constants/Colors';

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
        <BoxView direction="column" align="flex-start" justify="flex-start" style={styles.modalView}>
          <BackButton
            title={backTitle}
            onPress={() => toggleModal(false)}
          />
          {content}
        </BoxView>
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.white,
  },
});

export default ModalView;