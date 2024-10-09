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
          <View style={styles.wrapper}>
            <MapView
              style={styles.map}
              provider="google"
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
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
  wrapper: {
    width: '100%',
    height: 550,
  },
  map: {
    flex: 1,
  },
});

export default JamsMap;