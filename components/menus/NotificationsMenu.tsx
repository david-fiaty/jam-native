import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import NotificationsIcon from '../icons/NotificationsIcon';
import MenuItem from './MenuItem';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from '../navigation/BackButton';

const NotificationsMenu = () => {
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
                  <BackButton title="Notifications" style={styles.title} />
                </Pressable>
                <FlatList 
                  data={data} 
                  horizontal={false}  
                  style={styles.list}
                  renderItem={({item, index}) => <MenuItem item={item} index={index} />} 
                />
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <NotificationsIcon />
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
});

const data = [
  {
    'label': 'Lorem ipsum dolor sit amet',
    'path': '/jams',
  },
  {
    'label': 'Consectetur adipiscing elit',
    'path': '/jams',
  },
  {
    'label': 'Sed do eiusmod tempor',
    'path': '/jams',
  },
  {
    'label': 'Incididunt ut labore et dolore magna aliqua',
    'path': '/jams',
  },
  {
    'label': 'Ut enim ad minim veniam, quis nostrud',
    'path': '/jams',
  },
  {
    'label': 'Exercitation ullamco laboris nisi',
    'path': '/jams',
  },
  {
    'label': 'Excepteur sint occaecat cupidatat',
    'path': '/jams',
  },
];

export default NotificationsMenu;