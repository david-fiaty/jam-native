import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import ModalView from '@/components/base/ModalView';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import InputTextField from '../fields/InputTextField';
import TertiaryIcon from '../icons/TertiaryIcon';

type Props = {
  label: string,
  title: JSX.Element,
};

const LocationPickerField = ({label, title}: Props) => {
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
    <ModalView 
      title={title} 
      animation="slide"
      showBackButton={true}
      label={
        <View style={styles.label}>
          <TertiaryIcon name="location" size={GlobalStyles.space.base*1.5} containerStyle={styles.icon} />
          <InputTextField
            style={GlobalStyles.field}
            placeholder={label}
            placeholderTextColor={GlobalStyles.text.color}
            editable={false}
          />
        </View>
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
                title="You are here"
                description="Your current location"
              />
            </MapView>
          </View>
        </TouchableWithoutFeedback>
      }
    />   
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    width: '100%',
    height: 550,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
  },
});

export default LocationPickerField;