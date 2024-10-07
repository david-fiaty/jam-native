import { StyleSheet, View, Text} from 'react-native';
import ShareIcon from '../icons/ShareIcon';
import ModalWindow from '../ModalWindow';

const SaveJam = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<ShareIcon />}
        title="Save Jam" 
        content={
          <Text>SAVE JAM</Text>
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

export default SaveJam;