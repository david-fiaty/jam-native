import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

const AddJam = () => {
  return (
    <View style={styles.container}>     
      <ModalWindow 
        label={<Ionicons name="add" size={26} color={Colors.primary} />}
        title="Add Jam" 
        content={<Text>JAM FORM</Text>}
        animation="none"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AddJam;