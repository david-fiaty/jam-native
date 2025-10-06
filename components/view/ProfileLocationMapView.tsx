import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import i18n from "@/translation/i18n";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";
import ButtonView from "./ButtonView";
import ModalManager from "@/manager/ModalManager";

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const ProfileLocationMapView = ({ resource, latitude, longitude }: Props) => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getInitialRegion = () => {
    let latitude: any = Config.defaultLocation.latitude;
    let longitude: any = Config.defaultLocation.longitude;
    let latitudeDelta: any = 0.2;
    let longitudeDelta: any = 0.2;

    if (selectedLocation?.latitude && selectedLocation?.longitude) {
      latitude = selectedLocation.latitude;
      longitude = selectedLocation.longitude; 
    }
    else if (currentLocation?.latitude && currentLocation?.longitude) {
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude; 
    }

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());

      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  if (!isLoaded || !currentLocation?.latitude || !currentLocation?.longitude) return <SpinnerView />;
  
  return (
    <BoxView 
      direction="column" 
      align="flex-start" 
      justify="flex-start" 
      style={[Layout.screenContent, styles.container]}
    >
      <TouchableWithoutFeedback>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            customMapStyle={Layout.mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={getInitialRegion()}
          >
            { /*<Marker
              pinColor={Layout.colors.tertiary}
              title={i18n.t("Selected location")}
              description={i18n.t("This is the selected location")} // Todo - Reverse geocoding
              coordinate={{
                latitude: parseFloat(selectedLocation?.latitude),
                longitude: parseFloat(selectedLocation?.longitude),
              }}
            />*/}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
  
      <ButtonView
        label={i18n.t('Submit')}
        onPress={() => updateSelectedLocation()} 
        containerStyle={styles.confirmButton}  
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base*1.5,
    position: 'relative',
  },
  confirmButton: {
    bottom: '9%',
    position: 'absolute',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  map: {
    flex: 1,
  },
});

export default ProfileLocationMapView;
