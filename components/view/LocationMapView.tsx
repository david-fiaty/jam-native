import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import RNMapView, { Marker, MapPressEvent } from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
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
  const [deviceLocation, setDeviceLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const resource: string = activeScreen.params.resource;
  const fieldNames: any = activeScreen.params.fields;
  const formData: any = useSelector((state: any) => state[resource]);

  const updateLocation = (coords: any) => {
    dispatch(setFormData<any>({ 
      resource: resource,
      key: fieldNames.latitude, 
      value: coords.latitude, 
    }));

    dispatch(setFormData<any>({ 
      resource: resource,
      key: fieldNames.longitude, 
      value: coords.longitude, 
    }));
  };

  const onMapPress = async (event: MapPressEvent) => {
    updateLocation(event.nativeEvent.coordinate);
  };

  const isLocationSet = () => {
    return !isLoaded && formData?.[fieldNames.latitude] && formData?.[fieldNames.longitude];
  };

  useEffect(() => {
    (async () => {
      if (!isLocationSet()) {
        updateLocation((await DeviceManager.getLocation())?.coords);
        setIsLoaded(true);
      }
    })();
  }, []);

  if (!isLoaded) return <SpinnerView />;

  console.log(formData);
  
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
            onPress={onMapPress}
            initialRegion={{
              latitude: deviceLocation?.latitude || Config.defaultLocation.latitude,
              longitude: deviceLocation?.longitude || Config.defaultLocation.longitude,
              latitudeDelta: 2,
              longitudeDelta: 2,
            }}
          >
            {selectedLocation && (
              <Marker
                pinColor={Colors.secondary}
                title={i18n.t("Your Location")}
                description={i18n.t("This is your current location.")}
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
