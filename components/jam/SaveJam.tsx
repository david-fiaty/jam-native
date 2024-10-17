import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import TextBlock from '@/components/base/TextBlock';
import SecondaryIcon from '../icons/SecondaryIcon';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Jam is now saved to your Jams" 
        animation="slide"
        showBorder={true}
        label={<SecondaryIcon name="save" />}
        content={
          <View>
            <View style={styles.item}>
              <SecondaryIcon name="share" />
              <TextBlock>Share</TextBlock>
            </View>
            <View style={styles.item}>
              <SecondaryIcon name="layers" />
            <TextBlock>View my Jams</TextBlock>
            </View>
          </View>
        }
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space.base,
    padding: GlobalStyles.space.base,
  },
});

export default SaveJam;