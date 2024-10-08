import { StyleSheet, View, Text} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ModalView from '../ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        label={<MaterialCommunityIcons 
          name="share" 
          size={14} style={styles.icon} 
        />}
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
      padding: 6,
      borderRadius: 40,
    },
  }
});

export default ShareJam;