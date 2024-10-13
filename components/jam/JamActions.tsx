import { StyleSheet, View } from 'react-native';
import StaticIcon from '../base/StaticIcon';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
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
              <StaticIcon 
                name="view" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />         
              <TextBlock>View project</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="edit" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
              />          
              <TextBlock>Edit jam</TextBlock>
            </View>
            <View style={styles.row}>
              <StaticIcon 
                name="report" 
                iconStyle={GlobalStyles.tabs.icon} 
                containerStyle={[GlobalStyles.icon.clear, styles.icon]}
                size={styles.icon.size} 
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