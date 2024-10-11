import { StyleSheet, View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ActionsIcon from '../icons/ActionsIcon';

const JamActions = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="More" 
        label={<ActionsIcon size={14}/>}
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <Ionicons 
                name="save-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Save Jam</Text>
            </View>
            <View style={styles.row}>
              <Ionicons 
                name="share-social-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Share Jam</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="briefcase-plus-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Add to project</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="view-dashboard-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>View project</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="clipboard-edit-outline" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Edit jam</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons 
                name="warning-amber" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Report Jam</Text>
            </View>
            <View style={styles.row}>
              <Entypo 
                name="cross" 
                size={20} style={styles.icon} 
              />
              <Text style={GlobalStyles.text}>Delete Jam</Text>
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
    gap: GlobalStyles.gap,
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