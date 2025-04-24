import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";

const LocationMapView = () => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const resource: string = activeModal.params.resource;

  const onMapPress = async (event: MapPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    dispatch(setFormData<any>({ 
      resource: resource,
      key: null, 
      value: {
        [activeModal.params.latitude.key]: event.nativeEvent.coordinate.latitude,
        [activeModal.params.longitude.key]: event.nativeEvent.coordinate.longitude,
      }, 
    }));
  };

  const getStoredLocation = () => {
    if (activeModal.params.latitude.value && activeModal.params.longitude.value) {
      return {
        latitude: activeModal.params.latitude.value,
        longitude: activeModal.params.longitude.value,
      };
    } 

    return null;
  };

  const getDeviceLocation = async () => {
    let deviceLocation: any = await UserManager.getLocation();

    if (deviceLocation?.latitude && deviceLocation?.longitude) {
      return {
        latitude: deviceLocation?.latitude,
        longitude: deviceLocation?.longitude,
      };
    }

    return {
      latitude: Config.defaultLocation.latitude,
      longitude: Config.defaultLocation.longitude,
    }
  };

  useEffect(() => {
    (async () => {
      if (!selectedLocation) {
        let coords: any = {};
        let storedLocation: any = getStoredLocation();

        if (storedLocation) coords = storedLocation
        else coords = await getDeviceLocation()
    
        setSelectedLocation(coords);
        setIsLoaded(true);
      }
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
      <BoxView direction="column" align="center" style={Layout.backButtonContainer}>
        <BackButton
          title={i18n.t("Add location")}
          onPress={() => ScreenManager.toggleModal("LocationMapView")}
        />
      </BoxView>

      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            customMapStyle={Layout.mapStyle}
            showsUserLocation={true}
            onPress={onMapPress}
            initialRegion={{
              latitude: parseFloat(selectedLocation.latitude),
              longitude: parseFloat(selectedLocation.longitude),
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
          >
            {selectedLocation && (
              <Marker
                pinColor={Colors.tertiary}
                title={i18n.t("Selected location")}
                description={i18n.t("This is the selected location")} // Todo - Reverse geocoding
                coordinate={{
                  latitude: parseFloat(selectedLocation?.latitude),
                  longitude: parseFloat(selectedLocation?.longitude),
                }}
              />
            )}
          </MapView>
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
