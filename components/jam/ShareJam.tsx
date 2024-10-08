import { StyleSheet, View, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ModalWindow from '../ModalWindow';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<AntDesign name="arrowup" size={16} style={styles.icon} />}
        title="Share Jam" 
        content={
          <Text>SHARE JAM</Text>
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

export default ShareJam;