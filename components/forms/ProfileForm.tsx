import { StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        title="Profile" 
        content={
          <View style={styles.wrapper}>    
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              style={GlobalStyles.input}
              placeholder="Enter your email address"
              placeholderTextColor={GlobalStyles.text.color}
            />
          </View>
    
        }
        animation="none"
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  wrapper: {
    
  },
});

export default ProfileForm;