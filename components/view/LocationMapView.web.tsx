import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Config } from "@/constants/Config";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import UserManager from "@/manager/UserManager";
import SpinnerView from "./SpinnerView";

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const zoomLevel: number = 7;

const LocationMapView = ({ resource, latitude, longitude }: Props) => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Config.mapApiKey,
  });

  const getInitialRegion = () => {
    let lat: any = Config.defaultLocation.latitude;
    let lng: any = Config.defaultLocation.longitude;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      lat = currentLocation.latitude;
      lng = currentLocation.longitude;
    }

    return { lat: lat, lng: lng };
  };

  const onMapPress = async (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    dispatch(setFormData<any>({
      resource: resource,
      key: latitude.field,
      value: lat,
    }));

    dispatch(setFormData<any>({
      resource: resource,
      key: longitude.field,
      value: lng,
    }));
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
    })();
  }, []);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.screenContent, styles.container]}>
      <GoogleMap
        mapContainerStyle={styles.map}
        center={getInitialRegion()}
        zoom={zoomLevel}
        onClick={(e: any) => onMapPress(e)}
        options={{
          styles: Layout.mapStyle,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {selectedLocation && (
          <Marker position={selectedLocation} />
        )}
      </GoogleMap>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    width: '100%',
    flexGrow: 1,
    backgroundColor: Layout.colors.white,
  },
  map: {
    flex: 1,
  },
});

export default LocationMapView;
