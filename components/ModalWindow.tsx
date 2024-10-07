import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, Text, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from './navigation/BackButton';

type Props = {
  label: string, 
  title: string,
  component: JSX.Element,
  animation: string,
};

const ModalWindow = ({label, title, component, animation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>        
      <Modal
        animationType={animation}
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
                {component}
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
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