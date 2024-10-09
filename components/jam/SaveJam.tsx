import { StyleSheet, View, Text} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        label={<MaterialIcons 
          name="favorite-border" 
          size={14} 
          style={styles.icon} 
        />}
        title="Jam is now saved to your Jams" 
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="share" 
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