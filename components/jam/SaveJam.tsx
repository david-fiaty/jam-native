import { StyleSheet, View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Jam is now saved to your Jams" 
        label={<Ionicons 
          name="save-outline" 
          size={14} 
          style={styles.icon} 
        />}
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <Ionicons 
                name="share-social-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Share</Text>
            </View>
            <View style={styles.row}>
            <Ionicons 
              name="apps-sharp" 
              size={20} style={styles.icon} 
            />
            <Text style={GlobalStyles.text}>View my Jams</Text>
            </View>
          </View>
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
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