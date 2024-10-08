import { StyleSheet, View, Text} from 'react-native';
import ShareIcon from '../icons/ShareIcon';
import ModalWindow from '../ModalWindow';

const ShareJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<ShareIcon />}
        title="Share Jam" 
        content={
          <Text>SHARE JAM</Text>
        }
        animation="slide"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ShareJam;