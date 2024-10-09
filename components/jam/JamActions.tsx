import { StyleSheet, View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const JamActions = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        label={<Ionicons name="ellipsis-horizontal-sharp" size={24} color={GlobalStyles.icon.color} />}
        title="More" 
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

export default JamActions;