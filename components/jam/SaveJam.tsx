import { StyleSheet, View, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<AntDesign name="arrowdown" size={16} color={GlobalStyles.icon.color} />}
        title="Save Jam" 
        content={
          <Text>SAVE JAM</Text>
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default SaveJam;