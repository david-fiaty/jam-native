import { StyleSheet, Text, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const UserProfile = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        title="Profile" 
        content={<Text>USER PROFILE</Text>}
        animation="none"
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default UserProfile;