import { StyleSheet, View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import SaveIcon from '../icons/SaveIcon';
import ShareIcon from '../icons/ShareIcon';
import SquaresIcon from '../icons/SquaresIcon';

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
              <Text style={GlobalStyles.text}>Share</Text>
            </View>
            <View style={styles.row}>
            <SquaresIcon size={22} />
            <Text style={GlobalStyles.text}>View my Jams</Text>
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
    gap: 15,
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