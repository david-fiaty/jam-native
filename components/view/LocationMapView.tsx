import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import SpinnerView from "./SpinnerView";
import i18n from "@/translation/i18n";
import BoxView from "./BoxView";
import UserManager from "@/manager/UserManager";

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const LocationMapView = ({ resource, latitude, longitude }: Props) => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onMapPress = async (event: MapPressEvent) => {
    setSelectedLocation(event.nativeEvent.coordinate);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: latitude.field, 
      value: event.nativeEvent.coordinate.latitude, 
    }));

    dispatch(setFormData<any>({ 
      resource: resource,
      key: longitude.field, 
      value: event.nativeEvent.coordinate.longitude, 
    }));
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

  const getSelectedLocation = async () => {
    if (latitude?.value?.length && longitude?.value?.length) {
      return {
        latitude: latitude.value,
        longitude: longitude.value,
      };
    } 

    return null;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSelectedLocation(await getSelectedLocation());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);
  
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
            onPress={onMapPress}
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
  container: {
    padding: 0,
    paddingTop: Layout.space.base*1.5,
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

export default LocationMapView;
