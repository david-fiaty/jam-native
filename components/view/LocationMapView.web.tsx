import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Config } from "@/constants/Config";
import { useDispatch } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import UserManager from "@/manager/UserManager";

type Props = {
  resource: string,
  latitude?: any;
  longitude?: any;
};

const LocationMapView = ({ resource, latitude, longitude }: Props) => {
  const mapRef = useRef<any>();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const getInitialRegion = () => {
    let latitude: any = Config.defaultLocation.latitude;
    let longitude: any = Config.defaultLocation.longitude;
    let latitudeDelta: any = 0.2;
    let longitudeDelta: any = 0.2;

    if (currentLocation?.latitude && currentLocation?.longitude) {
      latitude = currentLocation.latitude;
      longitude = currentLocation.longitude;
    }

    return {
      lat: latitude,
      lng: longitude,
      //latitudeDelta: latitudeDelta,
      //longitudeDelta: longitudeDelta,
    };
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

    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);



  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <TouchableWithoutFeedback>
        <View style={[Layout.screenContent, styles.container]}>
          <GoogleMap
            mapContainerStyle={styles.map}
            center={getInitialRegion()}
            zoom={7}
            onClick={(e: any) => onMapPress(e)}
            options={{
              styles: Layout.mapStyle,
              disableDefaultUI: true,
            }}
          >
            {selectedLocation && (
              <Marker position={selectedLocation} />
            )}
          </GoogleMap>
        </View>
      </TouchableWithoutFeedback>
    </LoadScript>
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
