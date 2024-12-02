import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import RNMapView, { Marker, MapPressEvent } from "react-native-maps";
import { BaseProps } from "@/constants/Types";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";

const LocationMapView = ({ style, children }: BaseProps) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onMapPress = async (event: MapPressEvent) => {
    let coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);

    // Todo - Implement reverse geocoding
    let url = `${Config.geocodeUrl}?latlng=${coords.latitude},${coords.longitude}&key=${Config.mapApiKey}`;

    try {
      let response: any = await fetch(url);
      let address = response?.results;

      console.log(address);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      let deviceLocation: any = await DeviceManager.getLocation();
      if (deviceLocation && !selectedLocation) {
        let coords: any = {
          latitude: deviceLocation?.coords?.latitude,
          longitude: deviceLocation?.coords?.longitude,
        };
        
        setCurrentLocation(coords);
        setSelectedLocation(coords);
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
              latitude: currentLocation?.latitude || Config.defaultLocation.latitude,
              longitude: currentLocation?.longitude || Config.defaultLocation.longitude,
              latitudeDelta: 2,
              longitudeDelta: 2,
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
