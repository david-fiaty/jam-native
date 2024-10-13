import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import ShareIcon from '../icons/ShareIcon';
import LayersIcon from '../icons/LayersIcon';
import StaticIcon from '../base/StaticIcon';
import TextBlock from '@/components/base/TextBlock';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Jam is now saved to your Jams" 
        label={
          <StaticIcon 
            name="save" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={styles.icon.size} 
          />
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <ShareIcon size={22} />
              <TextBlock>Share</TextBlock>
            </View>
            <View style={styles.row}>
            <LayersIcon size={22} />
            <TextBlock>View my Jams</TextBlock>
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
      padding: GlobalStyles.space/1.5,
      borderRadius: 40,
      size: GlobalStyles.tabs.icon.size/1.5,
    },
  },
});

export default SaveJam;