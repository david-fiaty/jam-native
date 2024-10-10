import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from './navigation/BackButton';

type Props = {
  label: JSX.Element, 
  title: string,
  content: JSX.Element,
  animation?: string,
  backButton?: boolean,
};

const ModalView = ({label, title, content, animation, backButton}: Props) => {
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
              <View style={styles.modal.view}>
                <Pressable 
                  onPress={() => setModalVisible(!modalVisible)} 
                  style={backButton === false ? { display: 'none'} : {}}
                >
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
      alignItems: 'center',
      marginTop: StatusBar.currentHeight + GlobalStyles.statusbar.height + 10,
      height: '100%',
    },
    view: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
      alignItems: 'flex-start',
      padding: 20,
    },
  },
});

export default ModalView;