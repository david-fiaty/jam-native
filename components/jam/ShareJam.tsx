import { StyleSheet, View, Text} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalView from '../ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Share Jam" 
        label={<Ionicons 
          name="share-social-outline" 
          size={14} style={styles.icon} 
        />}
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <MaterialIcons 
                name="content-copy" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Copy link</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons 
                name="email" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Send email</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="instagram" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Instagram</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="facebook" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Facebook</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="twitter" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Twitter</Text>
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
  },
});

export default ShareJam;