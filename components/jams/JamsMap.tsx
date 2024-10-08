import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

const JamsMap = () => {
  return (
    <View style={styles.container}>       
      <ModalView 
        label={<Ionicons name="location" size={26} color={Colors.primary} />}
        title="Jams map" 
        content={<Text>JAMS MAP</Text>}
        animation="none"
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default JamsMap;