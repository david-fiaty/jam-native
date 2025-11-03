import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import i18n from "@/translation/i18n";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";
import ButtonView from "./ButtonView";
import ModalManager from "@/manager/ModalManager";
import FormManager from "@/manager/FormManager";

type Props = {
  resource?: string;
  parentKey?: string;
  latitude?: any;
  longitude?: any;
  rules?: any;
};

const SelectLocationMapView = ({ resource, parentKey, latitude, longitude, rules }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const updateSelectedLocation = () => {
    updateCoordinates(selectedLocation?.latitude, selectedLocation?.longitude);
    ModalManager.toggleModal('SelectLocationMapView');
  };

  const onMapPress = (event: MapPressEvent) => {
    let coord: any = event.nativeEvent.coordinate;
    setSelectedLocation(coord);   
    updateCoordinates(coord.latitude, coord.longitude);
  };

  const updateCoordinates = (lat: any, lng: any) => {
    if (resource && lat && lng && !parentKey) {
      FormManager.updateField(resource, latitude.key, lat, rules);
      FormManager.updateField(resource, longitude.key, lng, rules);
    }
    else if (resource && lat && lng && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${latitude.key}`, lat, rules);
      FormManager.updateField(resource, `${parentKey}.${longitude.key}`, lng, rules);
    }
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
      setSelectedLocation({ latitude: latitude?.value, longitude: longitude?.value });
    })();
  }, []);

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
            onPress={onMapPress}
          >
            <Marker
              pinColor={Layout.colors.tertiary}
              title={i18n.t("Selected location")}
              description={i18n.t("This is the selected location")} // Todo - Reverse geocoding
              coordinate={{
                latitude: parseFloat(selectedLocation?.latitude),
                longitude: parseFloat(selectedLocation?.longitude),
              }}
            />
          </MapView>
        </View>
      </TouchableWithoutFeedback>

      <ButtonView
        label={i18n.t('Submit')}
        onPress={updateSelectedLocation}
        containerStyle={styles.confirmButton}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: Layout.space.base * 1.5,
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

export default SelectLocationMapView;
