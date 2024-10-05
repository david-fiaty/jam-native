import { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import MenuIcon from '../icons/MenuIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

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
                <Text>Hello World!</Text>
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
});

export default SettingsMenu;