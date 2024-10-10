import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import JamForm from '../forms/JamForm';

const AddJam = () => {
  return (
    <View style={styles.container}>     
      <ModalView 
        title="Add a new Jam" 
        label={<Ionicons name="add" size={26} color={Colors.primary} />}
        content={<JamForm />}
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default AddJam;