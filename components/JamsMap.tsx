import { useState } from 'react';
import { StyleSheet, Modal, Pressable, Text, View, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const JamsMap = () => {
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
              <Text>Map</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name="location" size={26} color={Colors.primary} />
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

export default JamsMap;