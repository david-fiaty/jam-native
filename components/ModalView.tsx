import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from './navigation/BackButton';

type Props = {
  label: JSX.Element, 
  title: string,
  content: JSX.Element,
  animation?: string,
  menu?: boolean,
};

const ModalView = ({label, title, content, animation, menu}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationType = animation ? animation : 'slide';
  
  return (
    <View style={styles.container}>        
      <Modal
        animationType={animationType}
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modal.container}>
            <TouchableWithoutFeedback>
              <View style={menu ? styles.modal.menu : styles.modal.view}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <BackButton title={title} />
                </Pressable>
                {content}
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        {label}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: GlobalStyles.text,
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 16,
  },
  modal: {
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: 88,
    },
    view: {
      backgroundColor: 'red',
      width: '100%',
      alignItems: 'flex-start',
      padding: 20,
    },
    menu: {
      backgroundColor: 'blue',
      width: '100%',
      alignItems: 'flex-start',
      padding: 20,
    },
  },
});

export default ModalView;