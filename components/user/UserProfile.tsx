import { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>    
      <ModalWindow 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        title="Profile" 
        content={<Text>USER PROFILE</Text>}
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