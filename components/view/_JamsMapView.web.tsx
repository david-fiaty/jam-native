import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { Config } from "@/constants/Config";
import { Layout } from "@/constants/Layout";
import SpinnerView from "./SpinnerView";
import UserManager from "@/manager/UserManager";
import i18n from "@/translation/i18n";

const JamsMapView = () => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchResult = JSON.parse(useSelector((state: any) => state.search.current));
  const markerImage = require('@/assets/images/logo-55.png');
  const mapStyle: string = Layout.mapStyle;
  
  const getCenter = () => {
    let latitude = currentLocation?.coords?.latitude || Config.defaultLocation.latitude;
    let longitude = currentLocation?.coords?.longitude || Config.defaultLocation.longitude;

    return {
      lat: latitude,
      lng: longitude,
    }
  };

  const getMarkerCoordinate = (item: any) => {
    return {
      lat: parseFloat(item?.geolocation_latitude),
      lng: parseFloat(item?.geolocation_longitude),
    };
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
          title={getMarkerTitle(item)}
          //description={getMarkerDescription(item)}
          position={getMarkerCoordinate(item)}
          icon={markerImage} 
        />
      );
    }

    return null;
  };

  useEffect(() => {
    (async () => {
      setCurrentLocation(await UserManager.getLocation());
    })();
  
    setIsLoaded(true);
  }, [isLoaded]);
  
  if (!isLoaded) return <SpinnerView />;
  
  return (
    <LoadScript googleMapsApiKey={Config.mapApiKey}>
      <View style={[Layout.screenContent, styles.container]}>
        <GoogleMap 
          mapContainerStyle={styles.map} 
          center={getCenter()} 
          zoom={7} 
          options={{
            styles: mapStyle,
            disableDefaultUI: true,
          }}
        >
            { /*<Marker position={getCenter()} /> */}
            {searchResult?.jam?.map((item: any) => renderJamMarker(item))}
        </GoogleMap>
      </View>
    </LoadScript>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  map: {
    flex: 1,
  },
});

export default JamsMapView;
