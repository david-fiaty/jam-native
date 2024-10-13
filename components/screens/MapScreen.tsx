import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import ModalView from '@/components/base/ModalView';
import StaticIcon from '../base/StaticIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

const MapScreen = () => {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Location features are not available for simulator virtual devices.'
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

  return (
    <View style={styles.container}>       
      <ModalView 
        title="Jams map" 
        label={
          <StaticIcon 
            name="location" 
            iconStyle={GlobalStyles.tabs.icon} 
            containerStyle={[GlobalStyles.icon.clear, styles.icon]}
            size={GlobalStyles.tabs.icon.size} 
          />
        }
        content={
          <TouchableWithoutFeedback>
            <View style={styles.wrapper}>
              <MapView
                style={styles.map}
                provider="google"
                initialRegion={{
                  latitude: 8.6195,
                  longitude: 0.8248,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                }}
              >
                <Marker
                  key={1}
                  coordinate={{latitude: 6.1296, longitude: 1.2197}}
                  title="Jam location 1"
                  description="Jam location 1"
                />
                <Marker
                  key={2}
                  coordinate={{latitude: 6.2273, longitude: 1.5814}}
                  title="Jam location 2"
                  description="Jam location 2"
                />
                <Marker
                  key={3}
                  coordinate={{latitude: 9.7216, longitude: 1.0586}}
                  title="Jam location 3"
                  description="Jam location 3"
                />
              </MapView>
            </View>
          </TouchableWithoutFeedback>
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
  icon: {
    borderRadius: 0,
    padding: 0,
    borderWidth: 0,
  },
});

export default MapScreen;