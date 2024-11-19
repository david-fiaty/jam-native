import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from "react-native";
import { Marker } from "react-native-maps";
import * as Device from "expo-device";
import * as Location from "expo-location";
import RNMapView from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import SpinnerView from './SpinnerView';
import { Layout } from '@/constants/Layout';
import DataManager from '@/classes/DataManager';

const MapView = ({ style, children }: BaseProps) => {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        console.log('Location features are not available for virtual devices');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied.');
        return;
      }

      let location: any = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let data = await DataManager.get('jams');
      setTimeout(() => {
        setData(data);
      }, Layout.animation.duration);
    })();
  }, []);

  if (!location || !data)  {
    return <SpinnerView />
  }

  return (
    <TouchableWithoutFeedback>
      <View style={[Layout.screenContent, styles.container]}>
        <RNMapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: 8.6195,
            longitude: 0.8248,
            latitudeDelta: 3,
            longitudeDelta: 3,
          }}
        >
          { data.map((item: any) => {
            if (item?.longitude && item?.latitude) {
              return (
                <Marker
                  key={item.id}
                  coordinate={{ latitude: parseFloat(item?.latitude), longitude: parseFloat(item?.longitude) }}
                  title={item?.caption?.substring(0, 20) + '...'}
                  description={item?.caption}
                />
              );
            }

            return null;
          }) }

        </RNMapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base*2,
  },
  map: {
    flex: 1,
  },
});

export default MapView;