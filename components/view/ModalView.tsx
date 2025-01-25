import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import UserManager from '@/manager/UserManager';
import BackButton from '../button/BackButton';
import i18n from '@/translation/i18n';

type Props = {
  visible?: boolean;
  login?: boolean;
  animation?: string;
  trigger?: any;
  content?: any;
};

const ModalView = ({ visible, login, animation, trigger, content }: Props) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(visible);
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>

        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => toggleModal(true)}
        >
          {trigger}
        </TouchableOpacity>

        <Modal
          animationType={animationType}
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <BackButton
                title={i18n.t('More actions')}
                onPress={() => toggleModal(false)}
              />

              {content}

            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalView;