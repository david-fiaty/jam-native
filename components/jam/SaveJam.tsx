import { StyleSheet, View, Text} from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import SaveIcon from '../icons/SaveIcon';
import ShareIcon from '../icons/ShareIcon';
import LayersIcon from '../icons/LayersIcon';
import TextBlock from '@/components/base/TextBlock';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Jam is now saved to your Jams" 
        label={<SaveIcon size={14} />}
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
      padding: 6,
      borderRadius: 40,
    },
  }
});

export default SaveJam;