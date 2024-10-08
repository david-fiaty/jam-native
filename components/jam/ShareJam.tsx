import { StyleSheet, View, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ModalWindow from '../ModalWindow';
import { GlobalStyles } from '@/constants/GlobalStyles';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<AntDesign name="arrowup" size={16} color={GlobalStyles.icon.color} />}
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
});

export default ShareJam;