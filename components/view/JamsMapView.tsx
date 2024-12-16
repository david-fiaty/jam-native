import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Marker } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import RNMapView from "react-native-maps";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import EntityManager from "@/manager/EntityManager";
import i18n from "@/translation/i18n";

const JamsMapView = ({ style, children }: BaseProps) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
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


  DeviceManager.getLocation().then((data: any) => {
    setCurrentLocation(data);
  });

  useEffect(() => {
    (async () => {
      if (!jamsData?.length) setJamsData(await EntityManager.listJams());
      setCurrentLocation(await DeviceManager.getLocation());
      setIsLoaded(true);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <TouchableWithoutFeedback>
      <View style={[Layout.screenContent, styles.container]}>
        <RNMapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: currentLocation?.coords?.latitude || Config.defaultLocation.latitude,
            longitude: currentLocation?.coords?.longitude || Config.defaultLocation.longitude,
            latitudeDelta: 2,
            longitudeDelta: 2,
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
