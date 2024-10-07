import { useState } from 'react';
import { StyleSheet, Modal, Pressable, Text, View, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalWindow from './ModalWindow';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>    
      <ModalWindow 
        label="OOPP"
        title="test window" 
        animation="slide" 
        component={<Text>My modal component</Text>}
      />    
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

export default UserProfile;