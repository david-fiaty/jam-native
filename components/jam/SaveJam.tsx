import { StyleSheet, View, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<AntDesign name="arrowdown" size={16} style={styles.icon} />}
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
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.secondary,
      padding: 5,
      borderRadius: 40,
    },
  }
});

export default SaveJam;