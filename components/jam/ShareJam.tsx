import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import TextBlock from '@/components/base/TextBlock';
import SecondaryIcon from '../icons/SecondaryIcon';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Share Jam" 
        animation="slide"
        showBackButton={true}
        showBorder={true}
        label={<SecondaryIcon name="share" />}
        content={
          <View>
            <View style={styles.item}>
              <SecondaryIcon name="share" />        
              <TextBlock>Copy link</TextBlock>
            </View>
            <View style={styles.item}>
              <SecondaryIcon name="email" />
              <TextBlock>Send email</TextBlock>
            </View>
            <View style={styles.item}>
              <SecondaryIcon name="instagram" />
              <TextBlock>Instagram</TextBlock>
            </View>
            <View style={styles.item}>
              <SecondaryIcon name="facebook" />
              <TextBlock>Facebook</TextBlock>
            </View>
            <View style={styles.item}>
              <SecondaryIcon name="twitter" />
              <TextBlock>Twitter</TextBlock>
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

export default ShareJam;