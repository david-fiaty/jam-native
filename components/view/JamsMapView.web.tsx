import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";

type Props = {
  idArray?: any;
};

const JamsMapView = ({ idArray }: Props) => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const searchState: any = useSelector((state: any) => state.search);
  const markerImage = require('@/assets/images/logo-55.png');

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

  const getMarkerCoordinate = (item: any) => {
    const lat = parseFloat(item?.geolocation_latitude);
    const lng = parseFloat(item?.geolocation_longitude);

    return { lat, lng };
  };

  const getMarkerTitle = (item: any) => {
    return item?.title || i18n.t('No title available');
  };

  const getMarkerDescription = (item: any) => {
    return item?.caption || '';
  };

  const renderJamMarker = (item: any) => {
    if (item?.geolocation_longitude && item?.geolocation_latitude) {
      return (
        <Marker 
          key={item.id}
          position={getMarkerCoordinate(item)}
        />
      );
    }

    return null;
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
    })();
  }, [searchState]);

  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <TouchableWithoutFeedback>
        <View style={[Layout.screenContent, styles.container]}>
          <GoogleMap
            mapContainerStyle={styles.map}
            center={getInitialRegion()}
            zoom={7}
            options={{
              styles: Layout.mapStyle,
              disableDefaultUI: true,
            }}
          >
            {(JSON.parse(searchState.currentResults) || [])?.jam?.map((item: any) => renderJamMarker(item))}
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

export default JamsMapView;
