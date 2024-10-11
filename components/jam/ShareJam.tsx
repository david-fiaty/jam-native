import { StyleSheet, View, Text} from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ShareIcon from '../icons/ShareIcon';
import CopyIcon from '../icons/CopyIcon';
import EmailIcon from '../icons/EmailIcon';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalView 
        title="Share Jam" 
        label={<ShareIcon size={14} />}
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <View style={styles.row}>
              <CopyIcon size={22} />
              <Text style={GlobalStyles.text}>Copy link</Text>
            </View>
            <View style={styles.row}>
              <EmailIcon size={22} />
              <Text style={GlobalStyles.text}>Send email</Text>
            </View>
            <View style={styles.row}>
              <InstagramIcon size={22} />
              <Text style={GlobalStyles.text}>Instagram</Text>
            </View>
            <View style={styles.row}>
              <FacebookIcon size={22} />
              <Text style={GlobalStyles.text}>Facebook</Text>
            </View>
            <View style={styles.row}>
              <TwitterIcon size={22} />
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

export default ShareJam;