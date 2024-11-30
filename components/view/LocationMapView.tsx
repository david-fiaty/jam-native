import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import RNMapView, { Marker, MapPressEvent } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";

const LocationMapView = ({ style, children }: BaseProps) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onMapPress = (event: MapPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  useEffect(() => {
    (async () => {
      let currentLocation: any = await DeviceManager.getLocation();
      if (currentLocation && !selectedLocation) {
        setSelectedLocation({
          latitude: currentLocation?.coords?.latitude,
          longitude: currentLocation?.coords?.longitude,
        });
      }

      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView 
      direction="column" 
      align="flex-start" 
      justify="flex-start" 
      style={[Layout.screenContent, styles.screenContent]}
    >
      <BackButton
        title={i18n.t("Add location")}
        onPress={() => ScreenManager.toggleModal("ProfileForm")}
      />
      <TouchableWithoutFeedback>
        <View style={styles.container}>
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
                pinColor={Colors.secondary}
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
    </BoxView>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    padding: 0,
    paddingTop: Layout.space.base*1.5,
  },
  container: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationMapView;
