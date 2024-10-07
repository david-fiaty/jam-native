import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import BackButton from './navigation/BackButton';

type Props = {
  label: string, 
  title: string,
  content: JSX.Element,
  animation?: string,
};

const ModalWindow = ({label, title, content, animation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationType = animation ? animation : 'slide';
  
  return (
    <View style={styles.container}>        
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={GlobalStyles.modal.container}>
            <TouchableWithoutFeedback>
              <View style={GlobalStyles.modal.view}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <BackButton title={title} style={styles.title} />
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
  view: {
    ...GlobalStyles.modal.view,
    ...{
      backgroundColor: Colors.tertiary,
      height: '92.3%',
    }
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  text: GlobalStyles.text,
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 16,
  }
});

const data = [
  {
    'label': 'Account information',
    'path': '/jams',
  },
  {
    'label': 'Change password',
    'path': '/jams',
  },
  {
    'label': 'Change user name',
    'path': '/jams',
  },
  {
    'label': 'Delete account',
    'path': '/jams',
  },
];

export default ModalWindow;