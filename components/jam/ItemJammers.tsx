import { useState } from 'react';
import { StyleSheet, Modal, Pressable, View, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import BackButton from '../navigation/BackButton';
import JammersIcon from '../icons/JammersIcon';

const ItemJammers = () => {
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
                  <BackButton title="Jammers" style={styles.title} />
                </Pressable>
                <FlatList 
                  data={data} 
                  horizontal={false}  
                  style={styles.list}
                  renderItem={({item, index}) => <Text>Jammer {index}</Text>} 
                />
              </View>
              </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <JammersIcon />
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

export default ItemJammers;