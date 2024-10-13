import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import StaticIcon from '../base/StaticIcon';
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
          <StaticIcon 
            name="actions" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={styles.icon.size} 
          />          
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <StaticIcon 
                name="save" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Save Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="share" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Share Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="plus" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
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
              <Ionicons 
                name="alert-circle-outline" 
                size={20} style={styles.icon} 
              />
              <TextBlock>Report Jam</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="delete" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
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