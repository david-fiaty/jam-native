import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import ActionsIcon from '../icons/ActionsIcon';
import TextBlock from '@/components/base/TextBlock';

const JamActions = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="More" 
        label={
          <ActionsIcon size={14} />
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <Ionicons 
                name="save-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Save Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <Ionicons 
                name="share-social-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Share Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="briefcase-plus-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Add to project</TextBlock>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="view-dashboard-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>View project</TextBlock>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons 
                name="clipboard-edit-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Edit jam</TextBlock>
            </View>
            <View style={styles.row}>
              <MaterialIcons 
                name="warning-amber" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Report Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <Ionicons 
                name="trash-bin-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Delete Jam</TextBlock>
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
    gap: GlobalStyles.space,
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