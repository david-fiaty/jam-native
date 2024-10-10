import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Colors } from '@/constants/GlobalStyles';
import ModalView from '@/components/ModalView';

const JamsMap = () => {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let userLocation = location || {};
  let initialRegion = {
    latitude: userLocation.coords.latitude,
    longitude: userLocation.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  
  return (
    <View style={styles.container}>       
      <ModalView 
        title="Jams map" 
        label={<Ionicons name="location" size={26} color={Colors.primary} />}
        content={
          <View style={styles.wrapper}>
            <MapView
              style={styles.map}
              provider="google"
              initialRegion={initialRegion}
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