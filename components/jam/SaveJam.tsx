import { StyleSheet, View, Text} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<MaterialIcons 
          name="favorite-border" 
          size={14} 
          style={styles.icon} 
        />}
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
      padding: 6,
      borderRadius: 40,
    },
  }
});

export default SaveJam;