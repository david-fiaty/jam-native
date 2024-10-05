import { useState } from 'react';
import { StyleSheet, Modal, Text, Pressable, View, FlatList,TouchableWithoutFeedback } from 'react-native';
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
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.title}>Settings</Text>
                </Pressable>
                <FlatList 
                  data={data} 
                  horizontal={false}  
                  renderItem={({item, index}) => <Text style={styles.text}>{item.label}</Text>} 
                />
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
      fontSize: 24,
    },
  },
  text: GlobalStyles.text,
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

export default SettingsMenu;