import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/ModalView';

const JamsMap = () => {
  return (
    <View style={styles.container}>       
      <ModalView 
        label={<Ionicons name="location" size={26} color={Colors.primary} />}
        title="Jams map" 
        content={
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        }
        animation="none"
        backButton={false}
      />    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  map: {
    flex: 1,
    width: '100%',
    height: '92.3%',
    backgroundColor: '#FFFFFF',
  },
});

export default JamsMap;