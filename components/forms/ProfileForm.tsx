import { StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const ProfileForm = () => {
  return (
    <View style={styles.container}>    
      <ModalView 
        label={<Ionicons name="person-circle" size={26} color={Colors.primary} />}
        title="Your profile" 
        content={
          <View style={styles.wrapper}>    
            <TextInput
              style={styles.input}
              placeholder="Full name"
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
    width: '100%',
  },
  input: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 36,
    borderWidth: 1, 
    borderColor: Colors.tertiary, 
    borderRadius: 6,
    paddingHorizontal: 12, 
    marginBottom: 10,
  },
});

export default ProfileForm;