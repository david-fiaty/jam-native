import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Marker } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import RNMapView from "react-native-maps";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";

const JamsMapView = ({ style, children }: BaseProps) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [jamsData, setJamsData] = useState<any>(null);
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

  if (!jamsData?.length) {
    EntityManager.listJams().then((data: any) => {
      setJamsData(data);
      setIsLoaded(true);
    });
  }

  DeviceManager.getLocation().then((data: any) => {
    setCurrentLocation(data);
  });

  /*
  useEffect(() => {
    DeviceManager.getLocation().then((data: any) => {

    });

    (async () => {
      let currentLocation: any = await DeviceManager.getLocation();
      if (!currentLocation) {
        setCurrentLocation(currentLocation);
    })();
  }, []);
*/

  if (!isLoaded) return <SpinnerView />;

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
          {currentLocation && (
            <Marker
              pinColor={Colors.secondary}
              title={i18n.t("Your Location")}
              description={i18n.t("This is where you are currently")}
              coordinate={{
                latitude: parseFloat(currentLocation?.coords?.latitude),
                longitude: parseFloat(currentLocation?.coords?.longitude),
              }}
            />
          )}

          {jamsData?.map((item: any) => {
            if (item?.geolocation_longitude && item?.geolocation_latitude) {
              return renderMarker(item);
            }

            return null;
          })}
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

export default JamsMapView;
