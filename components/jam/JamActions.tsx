import { StyleSheet, View, Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from '@/constants/GlobalStyles';

import ModalWindow from '../ModalWindow';

const JamActions = () => {
  return (
    <View style={styles.container}>        
      <ModalWindow 
        label={<Ionicons name="ellipsis-horizontal-sharp" size={24} color={GlobalStyles.icon.color} />}
        title="More actions" 
        content={
          <Text>MORE ACTIONS</Text>
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

export default JamActions;