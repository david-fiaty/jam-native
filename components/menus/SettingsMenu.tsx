import { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import MenuIcon from '../icons/MenuIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { color } from '@rneui/base';

const SettingsMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={GlobalStyles.modal.container}>
            <TouchableWithoutFeedback>
              <View style={GlobalStyles.modal.view}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.title}>Settings</Text>
                </Pressable>
                <Text style={styles.text}>Hello World!</Text>
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <MenuIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  title: {
    ...GlobalStyles.text,
    ...{
      fontSize: 20,
    },
  },
  text: GlobalStyles.text,
});

const data = [
  {
    'title': 'Account information',
    'path': '/jams',
  },
  {
    'title': 'Change password',
    'path': '/jams',
  },
  {
    'title': 'Change user name',
    'path': '/jams',
  },
  {
    'title': 'Delete account',
    'path': '/jams',
  },
];

export default SettingsMenu;