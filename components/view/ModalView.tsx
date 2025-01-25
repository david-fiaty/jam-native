import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type Props = {
  visible?: boolean;
  animation?: string;
  trigger?: any;
  content?: any;
  onTriggerPress?: () => void;
};

const ModalView = ({ visible, animation, trigger, content, onTriggerPress }: Props) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const animationType: any = animation || 'slide';

  const toggleModal = (active: boolean) => {
    setModalVisible(active);
    if (onTriggerPress) onTriggerPress();
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
              {content}

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => toggleModal(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
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