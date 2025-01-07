import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import RNMapView, { Marker, MapPressEvent } from "react-native-maps";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import DeviceManager from "@/manager/DeviceManager";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";

const LocationMapView = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const resource: string = activeScreen.params.resource;

  const updateLocation = (coords: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: null, 
      value: {
        [activeScreen.params.latitude.key]: coords.latitude,
        [activeScreen.params.longitude.key]: coords.longitude,
      }, 
    }));
  };

  const onMapPress = async (event: MapPressEvent) => {
    let coords: any = event.nativeEvent.coordinate;
    updateLocation(coords);
  };

  const getStoredLocation = () => {
    if (activeScreen.params.latitude.value && activeScreen.params.longitude.value) {
      return {
        latitude: activeScreen.params.latitude.value,
        longitude: activeScreen.params.longitude.value,
      };
    } 

    return null;
  };

  useEffect(() => {
    (async () => {
      if (!selectedLocation) {
        let coords: any = {};
        let storedLocation: any = getStoredLocation();

        if (storedLocation) {
          coords = storedLocation;
        }
        else {
          let deviceLocation: any = await DeviceManager.getLocation();
          coords = {
            latitude: deviceLocation?.coords?.latitude,
            longitude: deviceLocation?.coords?.longitude,
          };
        }
    
        //updateLocation(coords, storedLocation);
      }

      setIsLoaded(true);
    })();
  }, [selectedLocation]);

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
        onPress={() => ScreenManager.toggleScreen("LocationMapView")}
      />
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <RNMapView
            style={styles.map}
            provider="google"
            onPress={onMapPress}
            initialRegion={{
              latitude: currentLocation?.latitude || Config.defaultLocation.latitude,
              longitude: currentLocation?.longitude || Config.defaultLocation.longitude,
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
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
