import { useState } from 'react';
import { StyleSheet, Modal, Text, Pressable, View, FlatList,TouchableWithoutFeedback } from 'react-native';
import MenuIcon from '../icons/MenuIcon';
import MenuItem from './MenuItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from '../navigation/BackButton';


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
                  <BackButton title="Settings" style={styles.title} />
                </Pressable>
                <FlatList 
                  data={data} 
                  horizontal={false}  
                  renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
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
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
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