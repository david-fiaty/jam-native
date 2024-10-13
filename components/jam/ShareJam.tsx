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
        label={
          <SecondaryIcon name="share" />
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <SecondaryIcon name="share" />        
              <TextBlock>Copy link</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="email" />
              <TextBlock>Send email</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="instagram" />
              <TextBlock>Instagram</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="facebook" />
              <TextBlock>Facebook</TextBlock>
            </View>
            <View style={styles.row}>
              <SecondaryIcon name="twitter" />
              <TextBlock>Twitter</TextBlock>
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
});

export default ShareJam;