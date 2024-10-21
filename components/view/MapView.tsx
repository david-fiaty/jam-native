import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from "react-native";
import { Marker } from "react-native-maps";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import TextView from "../view/TextView";
import { Layout } from '@/constants/Layout';
import SpinnerView from './SpinnerView';

export default ({ style, children }: BaseProps) => {
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Location features are not available for simulator virtual devices."
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!location) {
    return <SpinnerView />
  }

  const userLocation = location || {};

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
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
            coordinate={{ latitude: 6.1296, longitude: 1.2197 }}
            title="Jam location 1"
            description="Jam location 1"
          />
          <Marker
            key={2}
            coordinate={{ latitude: 6.2273, longitude: 1.5814 }}
            title="Jam location 2"
            description="Jam location 2"
          />
          <Marker
            key={3}
            coordinate={{ latitude: 9.7216, longitude: 1.0586 }}
            title="Jam location 3"
            description="Jam location 3"
          />
        </MapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
