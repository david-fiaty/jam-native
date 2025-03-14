import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Config } from "@/constants/Config";
import { Layout } from "@/constants/Layout";
import SpinnerView from "./SpinnerView";
import UserManager from "@/manager/UserManager";

const center = { lat: 37.7749, lng: -122.4194 };

const JamsMapView = () => {
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const getCenter = () => {
    let latitude = currentLocation?.coords?.latitude || Config.defaultLocation.latitude;
    let longitude = currentLocation?.coords?.longitude || Config.defaultLocation.longitude;

    return {
      lat: latitude,
      lng: longitude,
    }
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
        />
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
