import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import RNMapView, { Marker, MapPressEvent } from 'react-native-maps';
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import i18n from "@/translation/i18n";

const LocationMapView = ({ style, children }: BaseProps) => {
  const [deviceLocation, setDeviceLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderMarker = (item: any) => (
    <Marker
      key={item.id}
      title={item?.caption?.substring(0, 20) + "..."}
      description={item?.caption}
      coordinate={{
        latitude: parseFloat(item?.geolocation_latitude),
        longitude: parseFloat(item?.geolocation_longitude),
      }}
    />
  );

  const onMapPress = (event: MapPressEvent) => {
    //const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation(event.nativeEvent.coordinate);
  };


  useEffect(() => {
    (async () => {
      let currentLocation: any = await DeviceManager.getLocation();
      if (currentLocation) setDeviceLocation(currentLocation);

      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <SpinnerView />;

  console.log(selectedLocation);

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
          onPress={onMapPress}
        >
          {selectedLocation && (
            <Marker
              title={i18n.t("Your Location")}
              description={i18n.t("This is where you are currently")}
              coordinate={{
                latitude: parseFloat(selectedLocation?.latitude),
                longitude: parseFloat(selectedLocation?.longitude),
              }}
            />
          )}
        </RNMapView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base * 2,
  },
  map: {
    flex: 1,
  },
});

export default LocationMapView;
