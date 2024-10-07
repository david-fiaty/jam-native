import { useState } from 'react';
import { StyleSheet, Modal, Pressable, Text, View, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const UserAccount = () => {
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
              <View style={styles.view}>
                <Text>USER ACCOUNT</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Ionicons name="person-circle" size={26} color={Colors.primary} />
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
});

export default UserAccount;